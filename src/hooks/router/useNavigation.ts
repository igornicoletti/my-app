import { isValidElement, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { LAZY } from '@/constants'
import { getProtectedRoutes } from '@/routers'
import {
  buildNavigation,
  type NavigationProps
} from '@/utils'

export const useNavigation = (): NavigationProps[] => {
  const { pathname } = useLocation()

  return useMemo(() => {
    const protectedRoutes = getProtectedRoutes()

    const appLayoutRoute = protectedRoutes.find((route) =>
      isValidElement(route.element) && route.element.type === LAZY.AppLayout)

    const childRoutes = appLayoutRoute?.children ?? []
    return buildNavigation(childRoutes, pathname)
  }, [pathname])
}
