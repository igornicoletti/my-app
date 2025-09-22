import { useMatches } from 'react-router-dom'

interface CommonMetadata {
  title?: string
  description?: string
}

export const useMetadata = (): CommonMetadata => {
  const matches = useMatches()

  return matches.reduce((acc, match) => {
    const handle = match.handle as Partial<CommonMetadata> | undefined
    if (!handle) return acc

    const validEntries = Object
      .entries(handle)
      .filter(([, value]) => value !== undefined)

    return { ...acc, ...Object.fromEntries(validEntries) }
  }, {} as CommonMetadata)
}
