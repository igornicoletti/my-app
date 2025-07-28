import { useLocation } from 'react-router-dom'

import {
  heroData,
  type HeroKey,
  type HeroProps
} from '@/features/auth'

const isHeroKey = (key: string): key is HeroKey => {
  return key in heroData
}

export const useHero = (): { hero: HeroProps; key: HeroKey } => {
  const { pathname } = useLocation()

  const segment = pathname.split('/').filter(Boolean).pop() ?? ''
  const key = isHeroKey(segment) ? segment : 'login'

  return { hero: heroData[key], key }
}
