import { navigation, type NavigationItem } from '@/routes/config/navigation'
import { useLocation } from 'react-router-dom'

export interface Breadcrumb {
  name: string
  path?: string
  isCurrent: boolean
}

const findPathInNavigation = (
  items: NavigationItem[],
  pathname: string,
  parentLabels: string[]
): Omit<Breadcrumb, 'isCurrent'>[] => {
  for (const item of items) {
    if (item.url === pathname) {
      return [...parentLabels, item.title].map((label) => ({
        name: label,
        path: label === item.title ? item.url : undefined,
      }))
    }

    if (item.items && item.items.length > 0) {
      const foundInChildren = findPathInNavigation(
        item.items,
        pathname,
        [...parentLabels, item.title]
      )
      if (foundInChildren.length > 0) {
        return foundInChildren
      }
    }
  }
  return []
}

export const useBreadcrumb = (): Breadcrumb[] => {
  const location = useLocation()
  const { pathname } = location

  let breadcrumbs: Omit<Breadcrumb, 'isCurrent'>[] = []

  for (const section of navigation) {
    const parentLabels = section.label ? [section.label] : []
    const found = findPathInNavigation(section.items, pathname, parentLabels)

    if (found.length > 0) {
      breadcrumbs = found
      break
    }
  }

  if (breadcrumbs.length === 0) {
    return []
  }

  return breadcrumbs.map((crumb, index) => ({
    ...crumb,
    isCurrent: index === breadcrumbs.length - 1,
  }))
}
