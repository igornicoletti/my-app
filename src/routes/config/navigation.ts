import { ChartLineUpIcon, CheckSquareOffsetIcon, GearSixIcon, UserIcon, UsersIcon } from '@phosphor-icons/react'
import type { ElementType } from 'react'

export interface NavigationItem {
  title: string
  url: string
  icon?: ElementType
  isActive?: boolean
  items?: {
    title: string
    url: string
    icon?: ElementType
  }[]
}

export interface Navigation {
  label?: string
  items: NavigationItem[]
}

export const routeNavigations: Navigation[] = [
  {
    label: '',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: ChartLineUpIcon,
        items: []
      },
      {
        title: 'Tasks',
        url: '/tasks',
        icon: CheckSquareOffsetIcon,
        items: []
      },
      {
        title: 'Users',
        url: '/users',
        icon: UsersIcon,
        items: []
      }
    ]
  },
  {
    label: 'Other',
    items: [
      {
        title: 'Settings',
        url: '#2',
        icon: GearSixIcon,
        items: [
          {
            title: 'Profile',
            url: '#3',
            icon: UserIcon
          }
        ]
      }
    ]
  }
]
