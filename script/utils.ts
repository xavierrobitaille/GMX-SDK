import { BigNumber } from 'ethers'

import { writeFile, mkdir } from 'fs/promises'

export function toSerializable(obj: any): any {
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

export async function writeJsonToFile({ path = undefined, fileName, serializable }) {
  const now = new Date()
  const formattedDate = now
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '')
  const formattedTime = now
    .toTimeString()
    .slice(0, 5)
    .replace(':', '')
  if (path) await mkdir(path, { recursive: true })
  await writeFile(`${path || '.'}/${fileName}`, JSON.stringify(serializable, null, 2), 'utf8')
}
