import { useMatches } from 'react-router-dom'

type Metadata = {
  title?: string
  description?: string
}

export const useMetadata = (): Metadata => {
  const matches = useMatches()

  return matches.reduce((acc, match) => {
    const handle = match.handle as Metadata | undefined
    if (!handle) return acc

    const validEntries = Object.entries(handle).filter(([, value]) => value !== undefined)
    const filteredHandle = Object.fromEntries(validEntries) as Partial<Metadata>

    return { ...acc, ...filteredHandle }
  }, {} as Metadata)
}
