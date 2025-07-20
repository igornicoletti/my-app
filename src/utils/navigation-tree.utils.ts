import type { RouteObject } from 'react-router-dom'

import {
  ChartBarIcon,
  HouseSimpleIcon,
  UserIcon,
  type Icon,
} from '@phosphor-icons/react'

// ----- Types -----
type AppRouteHandle = {
  crumb: string
}

type SubItem = {
  title: string
  url: string
  isActive?: boolean
}

export type NavigationItem = {
  title: string
  url: string
  Icon?: Icon
  isActive?: boolean
  isGroupActive?: boolean
  subItems?: SubItem[]
}

// ----- Icon registry -----
const iconRegistry: Record<string, Icon> = {
  dashboard: HouseSimpleIcon,
  analytics: ChartBarIcon,
  users: UserIcon,
}

// ----- Utils -----
const normalizePath = (...paths: string[]): string =>
  paths.join('/').replace(/\/+/g, '/')

// ----- Sub-item generator -----
const createSubItems = (
  childRoutes: RouteObject[],
  parentUrl: string,
  currentPath: string
): SubItem[] => {
  return childRoutes
    .filter((child): child is RouteObject & {
      handle: AppRouteHandle
      path: string
    } =>
      !!child.path &&
      !child.path.includes(':') &&
      !!child.handle &&
      typeof (child.handle as AppRouteHandle).crumb === 'string'
    )
    .map((child) => {
      const subItemUrl = normalizePath(parentUrl, child.path!)
      return {
        title: (child.handle as AppRouteHandle).crumb,
        url: subItemUrl,
        isActive: currentPath === subItemUrl
      }
    })
}

// ----- Navigation tree builder -----
export const buildNavigationTree = (
  routes: RouteObject[],
  currentPath: string,
  parentUrl: string = ''
): NavigationItem[] => {
  return routes.reduce<NavigationItem[]>((acc, route) => {
    const { path, handle, children } = route

    const routeHandle = handle as AppRouteHandle | undefined

    if (!path || !routeHandle?.crumb) return acc

    const itemUrl = normalizePath(parentUrl, path)

    const navigationItem: NavigationItem = {
      title: routeHandle.crumb,
      url: itemUrl,
      Icon: iconRegistry[path] ?? iconRegistry.dashboard,
      isActive: currentPath === itemUrl,
      isGroupActive: currentPath === itemUrl || currentPath.startsWith(`${itemUrl}/`)
    }

    const subItems = children
      ? createSubItems(children, itemUrl, currentPath)
      : []

    if (subItems.length) {
      navigationItem.subItems = subItems
    }

    acc.push(navigationItem)
    return acc
  }, [])
}
