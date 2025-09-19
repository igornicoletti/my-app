import { type UserSchema } from '@/features/app/users/lib/schemas'
import { CheckCircleIcon, ClockIcon, CurrencyDollarSimpleIcon, ShieldIcon, UsersIcon, XCircleIcon, type IconProps } from '@phosphor-icons/react'

type IconComponent = React.ComponentType<IconProps>

export const statusIcons: Record<UserSchema['status'], IconComponent> = {
  Active: CheckCircleIcon,
  Inactive: XCircleIcon,
  Pending: ClockIcon,
}

export const roleIcons: Record<UserSchema['role'], IconComponent> = {
  Superadmin: ShieldIcon,
  Manager: UsersIcon,
  Cashier: CurrencyDollarSimpleIcon,
}
