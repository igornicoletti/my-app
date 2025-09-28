import { type UserSchema } from '@/features/app/user/lib/schema'
import { CheckCircleIcon, ClockCountdownIcon, EyeIcon, ProhibitIcon, ShieldCheckIcon, UsersIcon, type IconProps } from '@phosphor-icons/react'

type IconComponent = React.ComponentType<IconProps>

export const statusIcons: Record<UserSchema['status'], IconComponent> = {
  Active: CheckCircleIcon,
  Inactive: ProhibitIcon,
  Pending: ClockCountdownIcon,
}

export const roleIcons: Record<UserSchema['role'], IconComponent> = {
  Superadmin: ShieldCheckIcon,
  Manager: UsersIcon,
  Viewer: EyeIcon,
}
