import { useMarkets } from '../src/gmx/domain/synthetics/markets'
import { useTokensData } from '../src/gmx/domain/synthetics/tokens'
import { toSerializable, writeJsonToFile } from './utils'

console.log = () => {}
console.warn = () => {}

async function main() {
  const chainId = 42161
  try {
    const { marketsData, marketsAddresses } = await useMarkets(chainId)
    // const { tokensData, pricesUpdatedAt } = await useTokensData(chainId)

    const serializable = toSerializable(marketsData)
    await writeJsonToFile({ fileName: 'gmxMarkets.json', serializable })
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
