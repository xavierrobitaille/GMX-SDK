import { BigNumber } from 'ethers'

import { useMarketsInfo } from '../src/gmx/domain/synthetics/markets'
import { usePositionsInfo } from '../src/gmx/domain/synthetics/positions'

import { ethers } from 'ethers'

import ff from 'ffpublic'
//import HARDCODED_GMX_POSITION from '../fixtures/20241201.json'
// import HARDCODED_GMX_POSITION from '../fixtures/20241208_1710.json'
const HARDCODED_GMX_POSITION = null
import { writeFile } from 'fs/promises'

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

console.warn = () => {}

async function main() {
  try {
    const chainId = 42161
    const account = '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF'
    let positionsInfoData = HARDCODED_GMX_POSITION
    if (!HARDCODED_GMX_POSITION) {
      const markets = await useMarketsInfo(chainId, account)

      const res = await usePositionsInfo(chainId, {
        account: account,
        marketsInfoData: markets.marketsInfoData,
        tokensData: markets.tokensData,
        showPnlInLeverage: false
      })
      positionsInfoData = res.positionsInfoData
    }

    const serializablePositions = toSerializable(positionsInfoData)

    console.log(JSON.stringify(serializablePositions, null, 2))

    ff.ff()

    // const now = new Date()
    const positionDate = new Date('2024-12-01T00:00:00Z')
    const ffJson = { accounts: [] }

    // Iterate over positionsInfoData
    Object.entries(positionsInfoData).forEach(([key, position]) => {
      console.log('pos')
      // Type assertion for position
      const pos = position

      const longToken = pos.marketInfo?.longToken
      const claimableLongTokenAmount = pos.claimableLongTokenAmount

      if (longToken && claimableLongTokenAmount && longToken.prices.minPrice) {
        const externalSymbol = pos.marketInfo.name + ' ' + pos.collateralToken.symbol
        const interest = Number(pos.pendingClaimableFundingFeesUsd) / 10 ** 30
        const ffWireInCollateral = ff.ffWireInSymbol({
          dateStr: positionDate.toISOString(),
          symbol: pos.collateralToken.symbol === 'BTC' ? 'BTC.USD:CRYP' : 'USDT',
          amount: Number(pos.collateralAmount) / 10 ** pos.collateralToken.decimals,
          description: key,
          currency: 'USDT',
          symbolCurrency: 'USDT',
          label: externalSymbol,
          assetType: 'CRYPTO'
        })
        const ffWireInFutures = ff.ffFuturesTrade({
          amount: -Number(pos.sizeInTokens) / 10 ** pos.marketInfo.indexToken.decimals,
          assetType: 'CRYPTO',
          currency: 'USDT',
          dateStr: positionDate.toISOString(),
          description: 'Off market futures trade at initial upload',
          instruction: 'SELL',
          label: externalSymbol,
          price: Number(pos.entryPrice) / 10 ** 30,
          symbol: 'BTC.USD-PERP:CRYP',
          symbolCurrency: 'USDT'
        })
        const ffWireOutPendingBorrowingFees = ff.ffWireOutCurrency(
          {
            dateStr: positionDate.toISOString(),
            symbol: 'USDT',
            netAmount: -Number(pos.pendingBorrowingFeesUsd) / 10 ** 30,
            description: 'Borrowing Fees (Pending as of Initial Upload)',
            currency: 'USDT',
            symbolCurrency: 'USDT',
            label: 'Borrowing Fees',
            assetType: 'CRYPTO'
          },
          { forceEodUtc: false }
        )
        const ffWireOutClosingFee = ff.ffWireOutCurrency(
          {
            dateStr: positionDate.toISOString(),
            symbol: 'USDT',
            netAmount: -Number(pos.closingFeeUsd) / 10 ** 30,
            description: 'Closing Fees (Pending as of Initial Upload)',
            currency: 'USDT',
            symbolCurrency: 'USDT',
            label: 'Closing Fees',
            assetType: 'CRYPTO'
          },
          { forceEodUtc: false }
        )
        const ffWireOutPendingFundingFees = ff.ffWireOutCurrency(
          {
            dateStr: positionDate.toISOString(),
            symbol: 'USDT',
            netAmount: -Number(pos.pendingFundingFeesUsd) / 10 ** 30,
            description: 'Funding Fees (Pending as of Initial Upload)',
            currency: 'USDT',
            symbolCurrency: 'USDT',
            label: 'Negative Funding Fees',
            assetType: 'CRYPTO'
          },
          { forceEodUtc: false }
        )
        const ffWireInPendingClaimableFundingFees = ff.ffWireInCurrency(
          {
            dateStr: positionDate.toISOString(),
            symbol: 'USDT',
            netAmount: Number(pos.pendingClaimableFundingFeesUsd) / 10 ** 30,
            description: 'Claimable Funding Fees (Pending as of Initial Upload)',
            currency: 'USDT',
            symbolCurrency: 'USDT',
            label: 'Positive Funding Fees',
            assetType: 'CRYPTO'
          },
          { forceEodUtc: false }
        )

        ffJson.accounts.push({
          name: externalSymbol,
          transactions: [
            ffWireInCollateral,
            ffWireInFutures,
            ffWireOutPendingBorrowingFees,
            ffWireOutClosingFee,
            ffWireOutPendingFundingFees,
            ffWireInPendingClaimableFundingFees
          ]
        })
        console.log('#################################')
        console.log(ffWireInCollateral)
        console.log(ffJson)
        console.log('#################################')
      } else {
        console.log(`Position Key: ${key} is missing required data for calculation.`)
      }
    })

    // Write the ffJson object to a file
    await writeFile('ffJson.json', JSON.stringify(ffJson, null, 2), 'utf8')
    console.log('JSON has been successfully written to ffJson.json')

    if (!HARDCODED_GMX_POSITION) {
      const now = new Date()
      const formattedDate = now
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '')
      const formattedTime = now
        .toTimeString()
        .slice(0, 5)
        .replace(':', '')
      await writeFile(
        `fixtures/${formattedDate}_${formattedTime}.json`,
        JSON.stringify(
          {
            timestamp: now,
            positionsInfoData: serializablePositions
          },
          null,
          2
        ),
        'utf8'
      )
    }

    return
  } catch (error) {
    console.error('Error:', error)
    return
  }
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
