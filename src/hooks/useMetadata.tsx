import { useMatches } from 'react-router-dom'

type Metadata = {
  title?: string
  description?: string
}

export const useMetadata = (): Metadata => {
  const matches = useMatches()

  return matches.reduce((acc, match) => {
    const handle = match.handle as Partial<Metadata> | undefined
    if (!handle) return acc

    const validEntries = Object
      .entries(handle)
      .filter(([, value]) => value !== undefined)

    return { ...acc, ...Object.fromEntries(validEntries) }
  }, {} as Metadata)
}
