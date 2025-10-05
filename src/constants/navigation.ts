import { ChartLineUpIcon, CheckSquareOffsetIcon, GearSixIcon, UserIcon, UsersIcon } from '@phosphor-icons/react'
import type { ElementType } from 'react'

export interface NavigationItem {
  title: string
  url: string
  icon?: ElementType
  items?: NavigationItem[]
}

export interface NavigationGroup {
  label?: string
  items: NavigationItem[]
}

export const navigation: NavigationGroup[] = [
  {
    label: 'App',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: ChartLineUpIcon,
      },
      {
        title: 'Tasks',
        url: '/tasks',
        icon: CheckSquareOffsetIcon,
      },
      {
        title: 'Users',
        url: '/users',
        icon: UsersIcon,
      }
    ]
  },
  {
    label: 'Platform',
    items: [
      {
        title: 'Settings',
        url: '/settings',
        icon: GearSixIcon,
        items: [
          {
            title: 'Profile',
            url: '/settings/profile',
            icon: UserIcon
          }
        ]
      }
    ]
  }
]
