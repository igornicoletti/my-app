import type { RouteObject } from 'react-router-dom'

import { ChartPieSliceIcon, HouseSimpleIcon, type Icon } from '@phosphor-icons/react'

type AppRouteHandle = {
  crumb: string
}

type SubItemValues = {
  title: string
  url: string
  isActive?: boolean
}

export type NavigationValues = {
  title: string
  url: string
  Icon?: Icon
  isActive?: boolean
  isGroupActive?: boolean
  subItems?: SubItemValues[]
}

const iconRegistry: Record<string, Icon> = {
  dashboard: HouseSimpleIcon,
  analytics: ChartPieSliceIcon,
}

const normalizePath = (...paths: string[]): string => {
  return paths.join('/').replace(/\/+/g, '/')
}

const createSubItems = (childRoutes: RouteObject[], parentUrl: string, currentPath: string): SubItemValues[] => {
  return childRoutes.filter((child): child is RouteObject & { handle: AppRouteHandle; path: string } =>
    child.path && !child.path.includes(':') && child.handle && typeof (child.handle as AppRouteHandle).crumb === 'string').map((child) => {
      const subItemUrl = normalizePath(parentUrl, child.path)

      return {
        title: (child.handle as AppRouteHandle).crumb,
        url: subItemUrl,
        isActive: currentPath === subItemUrl
      }
    })
}

export const getNavigationTree = (routes: RouteObject[], currentPath: string, parentUrl: string = ''): NavigationValues[] => {
  return routes.reduce<NavigationValues[]>((accumulator, route) => {
    const { path, handle, children } = route

    const routeHandle = handle as AppRouteHandle | undefined

    if (!path || !routeHandle?.crumb) {
      return accumulator
    }

    const itemUrl = normalizePath(parentUrl, path)

    const navigationItem: NavigationValues = {
      title: routeHandle.crumb,
      url: itemUrl,
      Icon: iconRegistry[path] ?? iconRegistry.dashboard,
      isActive: currentPath === itemUrl,
      isGroupActive: currentPath === itemUrl || currentPath.startsWith(`${itemUrl}/`)
    }

    const subItems = children ? createSubItems(children, itemUrl, currentPath) : []

    if (subItems.length) {
      navigationItem.subItems = subItems
    }

    accumulator.push(navigationItem)
    return accumulator
  }, [])
}