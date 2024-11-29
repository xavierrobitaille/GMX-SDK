import { BigNumber } from 'ethers'

import { useMarketsInfo } from '../src/gmx/domain/synthetics/markets'
import { usePositionsInfo } from '../src/gmx/domain/synthetics/positions'

import { ethers } from 'ethers'

ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF)

// Helper function to recursively transform objects
function toSerializable(obj: any): any {
  if (BigNumber.isBigNumber(obj)) {
    return obj.toString() // Convert BigNumber to string
  }
  if (Array.isArray(obj)) {
    return obj.map(toSerializable) // Recursively process arrays
  }
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = toSerializable(obj[key])
      return acc
    }, {} as Record<string, any>)
  }
  return obj // Return primitive values as-is
}

console.warn = () => {}

async function main() {
  try {
    const chainId = 42161
    const account = '0x8E1E8AA0deD409Aa6cA3E37E76239e3E3ff70BdF'
    const markets = await useMarketsInfo(chainId, account)

    const positions = await usePositionsInfo(chainId, {
      account: account,
      marketsInfoData: markets.marketsInfoData,
      tokensData: markets.tokensData,
      showPnlInLeverage: false
    })

    // Serialize positions
    const serializablePositions = toSerializable(positions.positionsInfoData)

    console.log(JSON.stringify(serializablePositions, null, 2))
    return
  } catch (error) {
    console.error('Error:', error)
    return
  }
}

main()
