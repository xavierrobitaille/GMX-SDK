import { writeFile } from 'fs/promises'
import { BigNumber } from 'ethers'

import { useMarketsInfo } from '../src/gmx/domain/synthetics/markets'
import { usePositionsInfo } from '../src/gmx/domain/synthetics/positions'
import { ethers } from 'ethers'
import ff from 'ffpublic'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
  .option('lastFile', {
    type: 'string',
    description: 'Path to the last positions info data file',
    demandOption: false
  })
  .option('currentFile', {
    type: 'string',
    description: 'Path to the current positions info data file',
    demandOption: false
  })
  .help().argv

const USE_HARDCODED_GMX = false
import {
  timestamp as HARDCODED_TIMESTAMP,
  positionsInfoData as HARDCODED_GMX_POSITION
} from '../fixtures/20241208_1710.json'
import { timestamp as gmxLastTimstamp, positionsInfoData as gmxLast } from '../fixtures/20241208_1710.json'

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
    let feesDateStr = HARDCODED_TIMESTAMP

    if (argv.lastFile) {
      const lastPosData = require(argv.lastFile)
      positionsInfoData = lastPosData.positionsInfoData
      feesDateStr = lastPosData.timestamp
    }

    if (argv.currentFile) {
      const currentPosData = require(argv.currentFile)
      positionsInfoData = currentPosData.positionsInfoData
      feesDateStr = currentPosData.timestamp
    }

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

    console.log(JSON.stringify(serializablePositions, null, 2))

    ff.ff()

    const ffUpdatedFees = { accounts: [] }

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
        console.log('#################################')
        console.log(ffUpdatedFees)
        console.log('#################################')
      } else {
        console.log(`Position Key: ${key} is missing required data for calculation.`)
      }
    })

    // Write the ffUpdatedFees object to a file
    await writeFile('ffUpdatedFees.json', JSON.stringify(ffUpdatedFees, null, 2), 'utf8')
    console.log('JSON has been successfully written to ffUpdatedFees.json')

    if (!USE_HARDCODED_GMX) {
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
        JSON.stringify(serializablePositions, null, 2),
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
