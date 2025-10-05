import type { AppHero } from '@/types/hero'
import { useMatches } from 'react-router-dom'

interface MetadataProps {
  title?: string
  description?: string
}

export const useMetadata = (): MetadataProps => {
  const matches = useMatches()

  return matches.reduce((acc, match) => {
    const handle = match.handle as Partial<AppHero> | undefined
    if (!handle) return acc

    const mappedHandle: Partial<MetadataProps> = {}

    if (handle.heading) {
      mappedHandle.title = handle.heading
    }
    if (handle.subheading) {
      mappedHandle.description = handle.subheading
    }

    const validEntries = Object
      .entries(mappedHandle)
      .filter(([, value]) => value !== undefined)

    return { ...acc, ...Object.fromEntries(validEntries) }
  }, {} as MetadataProps)
}
