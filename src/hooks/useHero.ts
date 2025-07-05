import { useLocation } from 'react-router-dom'

import { HERO, type HeroKey, type HeroValues } from '@/configs'

export const useHero = (): HeroValues => {
  const { pathname } = useLocation()

  const segment = pathname.split('/').filter(Boolean).pop()

  if (!segment || !(segment in HERO)) {
    console.warn(`[useHero] Unknown auth segment: '${segment}'. Falling back to 'login'.`)
    return HERO.login
  }

  return HERO[segment as HeroKey]
}