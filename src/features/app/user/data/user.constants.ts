import { ClockCountdownIcon, ProhibitIcon, UserCircleCheckIcon } from '@phosphor-icons/react'

export const userStatuses = [
  {
    label: 'Done',
    value: 'done',
    icon: UserCircleCheckIcon
  },
  {
    label: 'Blocked',
    value: 'blocked',
    icon: ProhibitIcon
  },
  {
    label: 'In Progress',
    value: 'in-progress',
    icon: ClockCountdownIcon
  }
]
export const userRoles = [
  {
    label: 'Admin',
    value: 'admin'
  },
  {
    label: 'Owner',
    value: 'owner'
  },
  {
    label: 'Viewer',
    value: 'viewer'
  }
]
