import { isValidElement, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { ROUTE_ELEMENTS } from '@/configs'
import { getProtectedRoutes } from '@/routers'
import {
  buildNavigationTree,
  type NavigationItem
} from '@/utils'

export const useNavigation = (): NavigationItem[] => {
  const { pathname } = useLocation()

  return useMemo(() => {
    const protectedRoutes = getProtectedRoutes()

    const appLayoutRoute = protectedRoutes.find((route) =>
      isValidElement(route.element) &&
      route.element.type === ROUTE_ELEMENTS.AppLayout)

    const childRoutes = appLayoutRoute?.children ?? []

    return buildNavigationTree(childRoutes, pathname)
  }, [pathname])
}
