import type { RouteObject } from 'react-router-dom'

import type { Icon } from '@phosphor-icons/react'

import { ICON } from '@/constants'

type HandleProps = {
  crumb: string
}

type SubItemProps = {
  title: string
  url: string
  Icon?: Icon
  isActive?: boolean
}

export type NavigationProps = {
  title: string
  url: string
  Icon?: Icon
  isActive?: boolean
  isGroupActive?: boolean
  subItems?: SubItemProps[]
}

const normalizePath = (...paths: string[]): string =>
  paths.join('/').replace(/\/+/g, '/')

const generateSubItems = (
  routes: RouteObject[],
  parentUrl: string,
  currentPath: string
): SubItemProps[] =>
  routes
    .filter((route): route is RouteObject & { path: string; handle: HandleProps } =>
      Boolean(route.path) &&
      !route.path!.includes(':') &&
      typeof (route.handle as HandleProps)?.crumb === 'string'
    )
    .map((route) => {
      const subUrl = normalizePath(parentUrl, route.path!)
      return {
        title: route.handle!.crumb,
        url: subUrl,
        Icon: ICON[route.path!] || undefined,
        isActive: currentPath === subUrl,
      }
    })

export const buildNavigation = (
  routes: RouteObject[],
  currentPath: string,
  parentUrl: string = ''
): NavigationProps[] =>
  routes.reduce<NavigationProps[]>((items, route) => {
    const { path, handle, children } = route
    const routeHandle = handle as HandleProps

    if (!path || !routeHandle?.crumb) return items

    const itemUrl = normalizePath(parentUrl, path)
    const isActive = currentPath === itemUrl
    const isGroupActive = isActive || currentPath.startsWith(`${itemUrl}/`)
    const navItem: NavigationProps = {
      title: routeHandle.crumb,
      url: itemUrl,
      Icon: ICON[path] ?? ICON.dashboard,
      isActive,
      isGroupActive,
      subItems: children ? generateSubItems(children, itemUrl, currentPath) : undefined,
    }

    items.push(navItem)
    return items
  }, [])
