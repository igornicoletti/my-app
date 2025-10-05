import type { HeroCollection } from '@/types/hero'
import { createContext, useContext, useMemo, type ReactNode } from 'react'

interface ProviderHeroProps {
  heroCollection: HeroCollection
}

const ProviderHeroContext = createContext<ProviderHeroProps | undefined>(undefined)

export const ProviderHero = ({ collection, children }: { collection: HeroCollection, children: ReactNode }) => {
  const value = useMemo(() => ({
    heroCollection: collection
  }), [collection])

  return (
    <ProviderHeroContext.Provider value={value}>
      {children}
    </ProviderHeroContext.Provider>
  )
}

export const useHeroCollection = () => {
  const ctx = useContext(ProviderHeroContext)
  if (ctx === undefined) {
    throw new Error('useHeroCollection must be used within a HeroProvider')
  }
  return ctx.heroCollection
}
