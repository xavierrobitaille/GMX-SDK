import { BigNumber } from 'ethers'

import { useMarketsInfo } from '../src/gmx/domain/synthetics/markets'
import { usePositionsInfo } from '../src/gmx/domain/synthetics/positions'

import { ethers } from 'ethers'

import ff from 'ffpublic'
import HARDCODED_GMX_POSITION from '../fixtures/20241201.json'
//import HARDCODED_GMX_POSITION from '../fixtures/20241207_1637.json'
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
    // const markets = await useMarketsInfo(chainId, account)

    // const { positionsInfoData } = await usePositionsInfo(chainId, {
    //   account: account,
    //   marketsInfoData: markets.marketsInfoData,
    //   tokensData: markets.tokensData,
    //   showPnlInLeverage: false
    // })
    const positionsInfoData = HARDCODED_GMX_POSITION

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
        const symbol = 'BTC.USD-PERP:CRYP'
        const ffWireIn = ff.ffWireInSymbol({
          dateStr: positionDate.toISOString(),
          symbol: pos.collateralToken.symbol === 'BTC' ? 'BTC.USD:CRYP' : 'USDT',
          amount: Number(pos.collateralAmount) / 10 ** pos.collateralToken.decimals,
          description: key,
          currency: 'USDT',
          symbolCurrency: 'USDT',
          label: externalSymbol,
          assetType: 'CRYPTO'
        })
        ffJson.accounts.push({ name: externalSymbol, transactions: [ffWireIn] })
        console.log('#################################')
        console.log(ffWireIn)
        console.log(ffJson)
        console.log('#################################')
      } else {
        console.log(`Position Key: ${key} is missing required data for calculation.`)
      }
    })

    // Write the ffJson object to a file
    await writeFile('ffJson.json', JSON.stringify(ffJson, null, 2), 'utf8')

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
    console.log('JSON has been successfully written to ffJson.json')

    return
  } catch (error) {
    console.error('Error:', error)
    return
  }
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
