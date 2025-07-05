import type { RouteObject } from 'react-router-dom'

import { GearIcon, HouseSimpleIcon, UserIcon, type Icon } from '@phosphor-icons/react'

export type SidebarValues = {
  title: string
  url: string
  icon: Icon
  isActive?: boolean
  items?: {
    title: string
    url: string
    isActive?: boolean
  }[]
}

const iconMap: Record<string, Icon> = {
  dashboard: HouseSimpleIcon,
  profile: UserIcon,
  settings: GearIcon
}

export const mapRoutesToSidebar = (routes: RouteObject[], currentPath: string, parentPath: string = ''): SidebarValues[] => {
  const sidebarItems: SidebarValues[] = []

  for (const route of routes) {
    const isValidRoute = route.path && route.handle && typeof route.handle.crumb === 'string'

    if (!isValidRoute) continue

    const fullPath = `${parentPath}/${route.path}`.replace(/\/\/+/g, '/')

    const title = route.handle.crumb as string

    const IconComponent = iconMap[route.path as string] ?? HouseSimpleIcon

    const isItemActive = currentPath.startsWith(fullPath)
      && (currentPath === fullPath
        || (route.children
          && currentPath.length > fullPath.length
          && currentPath[fullPath.length] === '/'))

    const item: SidebarValues = {
      title,
      url: fullPath,
      icon: IconComponent,
      isActive: isItemActive
    }

    const childRoutes = route.children?.filter(child => child.path
      && child.handle
      && typeof child.handle.crumb === 'string'
      && !child.path.includes(':'))

    if (childRoutes?.length) {
      item.items = childRoutes.map(child => {
        const subFullPath = `${fullPath}/${child.path}`.replace(/\/\/+/g, '/')
        return {
          title: child.handle!.crumb as string,
          url: subFullPath,
          isActive: currentPath === subFullPath
        }
      })

      item.isActive ||= item.items.some(sub => sub.isActive)
    }

    sidebarItems.push(item)
  }

  return sidebarItems
}
