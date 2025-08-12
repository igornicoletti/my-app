import { useMatches } from 'react-router-dom'

interface MetadataHelmet {
  title?: string
  description?: string
}

export const useMetadataHelmet = (): MetadataHelmet => {
  const matches = useMatches()

  return matches.reduce((acc, match) => {
    const handle = match.handle as Partial<MetadataHelmet> | undefined
    if (!handle) return acc

    const validEntries = Object
      .entries(handle)
      .filter(([, value]) => value !== undefined)

    return { ...acc, ...Object.fromEntries(validEntries) }
  }, {} as MetadataHelmet)
}
