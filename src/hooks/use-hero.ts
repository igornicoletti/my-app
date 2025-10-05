import { useHeroCollection } from '@/providers/hero'
import type { AppHero } from '@/types/hero'
import { useLocation } from 'react-router-dom'

export const useHero = (): { hero: AppHero | undefined; key: string } => {
  const { pathname } = useLocation()
  const heroCollection = useHeroCollection()

  const segment = pathname.split('/').filter(Boolean).pop() ?? ''

  const hero = heroCollection[segment]

  return { hero, key: segment }
}
