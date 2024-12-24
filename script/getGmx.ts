import { BigNumber } from 'ethers'

import { useMarketsInfo } from '../src/gmx/domain/synthetics/markets'
import { usePositionsInfo } from '../src/gmx/domain/synthetics/positions'

import { writeFile, mkdir } from 'fs/promises'

import * as dotenv from 'dotenv'
dotenv.config()

const accounts = process.env.ACCOUNTS.split(',')

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

console.log = () => {}
console.warn = () => {}

async function main() {
  for (const account of accounts) {
    try {
      const chainId = 42161
      console.error('processing account', account)
      //const account = '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF'
      const markets = await useMarketsInfo(chainId, account)

      const res = await usePositionsInfo(chainId, {
        account: account,
        marketsInfoData: markets.marketsInfoData,
        tokensData: markets.tokensData,
        showPnlInLeverage: false
      })
      const positionsInfoData = res.positionsInfoData

      const serializablePositions = toSerializable(positionsInfoData)

      const now = new Date()
      const formattedDate = now
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '')
      const formattedTime = now
        .toTimeString()
        .slice(0, 5)
        .replace(':', '')
      await mkdir(`fixtures/${account}`, { recursive: true })
      await writeFile(
        `fixtures/${account}/${formattedDate}_${formattedTime}.json`,
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
    } catch (error) {
      console.error('Error:', error)
      continue
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
