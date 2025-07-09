import { isValidElement, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { ROUTE } from '@/configs'
import { getProtectedRoutes } from '@/routers'
import {
  getNavigationTree,
  type NavigationValues
} from '@/utils'

export const useNavigation = (): NavigationValues[] => {
  const { pathname } = useLocation()

  return useMemo(() => {
    const protectedRoutes = getProtectedRoutes()

    const appLayoutRoute = protectedRoutes.find((route) =>
      isValidElement(route.element) && route.element.type === ROUTE.AppLayout)

    const childRoutes = appLayoutRoute?.children || []

    return getNavigationTree(childRoutes, pathname)
  }, [pathname])
}
