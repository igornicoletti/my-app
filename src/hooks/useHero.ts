import { useLocation } from 'react-router-dom'

import {
  HERO,
  type HeroContent,
  type HeroSectionKey
} from '@/configs'

export const useHero = (): HeroContent => {
  const { pathname } = useLocation()
  const segment = pathname.split('/').filter(Boolean).pop()

  if (!segment || !(segment in HERO)) {
    console.warn(`[useHero] Unknown auth segment: ${segment}`)
    return HERO.login
  }

  return HERO[segment as HeroSectionKey]
}
