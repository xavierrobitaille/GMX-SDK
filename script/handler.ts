import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { BigNumber } from 'ethers'
import { useMarketsInfo } from '../src/gmx/domain/synthetics/markets'
import { usePositionsInfo } from '../src/gmx/domain/synthetics/positions'
import { ethers } from 'ethers'
import ff from 'ffpublic'
import path from 'path'

const USE_HARDCODED_GMX = true
import {
  timestamp as HARDCODED_TIMESTAMP,
  positionsInfoData as HARDCODED_GMX_POSITION
} from '../fixtures/20241208_1710.json'

let gmxLastTimstamp = HARDCODED_TIMESTAMP
let gmxLast = HARDCODED_GMX_POSITION

async function getPositions(): Promise<any> {
  const chainId = 42161
  const account = '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF'
  let positionsInfoData = HARDCODED_GMX_POSITION
  let feesDateStr = HARDCODED_TIMESTAMP

  if (!USE_HARDCODED_GMX) {
    const markets = await useMarketsInfo(chainId, account)
    const res = await usePositionsInfo(chainId, {
      account: account,
      marketsInfoData: markets.marketsInfoData,
      tokensData: markets.tokensData,
      showPnlInLeverage: false
    })
    positionsInfoData = res.positionsInfoData
    feesDateStr = new Date().toISOString()
  }

  const serializablePositions = toSerializable(positionsInfoData)

  const ffUpdatedFees = { accounts: [] }

  Object.entries(positionsInfoData).forEach(([key, position]) => {
    const pos = position

    const longToken = pos.marketInfo?.longToken
    const claimableLongTokenAmount = pos.claimableLongTokenAmount

    if (longToken && claimableLongTokenAmount && longToken.prices.minPrice) {
      const externalSymbol = pos.marketInfo.name + ' ' + pos.collateralToken.symbol
      const interest = Number(pos.pendingClaimableFundingFeesUsd) / 10 ** 30
      const symbol = 'BTC.USD-PERP:CRYP'
      let delta = Number(pos.pendingBorrowingFeesUsd) - Number(gmxLast[key].pendingBorrowingFeesUsd)
      const ffIncrementBorrowingFees = ff.ffFee(
        {
          dateStr: feesDateStr,
          symbol: 'USDT',
          netAmount: delta / 10 ** 30,
          description: 'Borrowing Fees (Pending as of Initial Upload)',
          currency: 'USDT',
          symbolCurrency: 'USDT',
          label: 'externalSymbol',
          assetType: 'CRYPTO'
        },
        { forceEodUtc: false }
      )
      delta = Number(pos.closingFeeUsd) - Number(gmxLast[key].closingFeeUsd)
      const ffIncrementClosingFee = ff.ffFee(
        {
          dateStr: feesDateStr,
          symbol: 'USDT',
          netAmount: delta / 10 ** 30,
          description: 'Closing Fees',
          currency: 'USDT',
          symbolCurrency: 'USDT',
          label: 'Closing Fees',
          assetType: 'CRYPTO'
        },
        { forceEodUtc: false }
      )
      delta = Number(pos.pendingFundingFeesUsd) - Number(gmxLast[key].pendingFundingFeesUsd)
      const ffIncrementFundingFees = ff.ffFee(
        {
          dateStr: feesDateStr,
          symbol: 'USDT',
          netAmount: -delta / 10 ** 30,
          description: 'Funding Fees',
          currency: 'USDT',
          symbolCurrency: 'USDT',
          label: 'Negative Funding Fees',
          assetType: 'CRYPTO'
        },
        { forceEodUtc: false }
      )
      delta = Number(pos.pendingClaimableFundingFeesUsd) - Number(gmxLast[key].pendingClaimableFundingFeesUsd)
      const ffIncrementClaimableFundingFees = ff.ffInterest(
        {
          dateStr: feesDateStr,
          symbol: 'USDT',
          netAmount: delta / 10 ** 30,
          description: 'Claimable Funding Fees',
          currency: 'USDT',
          symbolCurrency: 'USDT',
          label: 'Positive Funding Fees',
          assetType: 'CRYPTO'
        },
        { forceEodUtc: false }
      )

      ffUpdatedFees.accounts.push({
        name: externalSymbol,
        transactions: [
          ffIncrementBorrowingFees,
          ffIncrementClosingFee,
          ffIncrementFundingFees,
          ffIncrementClaimableFundingFees
        ]
      })
    } else {
      console.log(`Position Key: ${key} is missing required data for calculation.`)
    }
  })

  return ffUpdatedFees
}

function toSerializable(obj: any): any {
  if (BigNumber.isBigNumber(obj)) {
    return obj.toString()
  }
  if (Array.isArray(obj)) {
    return obj.map(toSerializable)
  }
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = toSerializable(obj[key])
      return acc
    }, {} as Record<string, any>)
  }
  return obj
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const result = await getPositions()
    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2)
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
}
