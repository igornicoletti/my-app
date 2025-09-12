import { type UserSchema } from '@/features/app/users/lib/schemas'
import { CheckCircleIcon, CircleDashedIcon, ClockIcon, CurrencyDollarSimpleIcon, ShieldIcon, UsersIcon, XCircleIcon } from '@phosphor-icons/react'

export const getStatusIcon = (status: UserSchema['status']) => {
  const statusIcons: Record<UserSchema['status'], any> = {
    Active: CheckCircleIcon,
    Inactive: XCircleIcon,
    Pending: ClockIcon,
  }
  return statusIcons[status] || CircleDashedIcon
}

export const getRoleIcon = (role: UserSchema['role']) => {
  const roleIcons: Record<UserSchema['role'], any> = {
    Superadmin: ShieldIcon,
    Manager: UsersIcon,
    Cashier: CurrencyDollarSimpleIcon,
  }
  return roleIcons[role] || ShieldIcon
}
