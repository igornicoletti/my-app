import { faker } from '@faker-js/faker'
import { CheckCircleIcon, CircleDashedIcon, ClockIcon, CurrencyDollarSimpleIcon, ShieldIcon, UsersIcon, XCircleIcon } from '@phosphor-icons/react'

import { roles, statuses, type UserSchema } from '@/features/app/users/lib/schemas'
import { generateId } from '@/lib/id'

export const generateRandomUser = (): UserSchema => ({
  id: generateId('user'),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.helpers.replaceSymbols('+## (##) # #### ####'),
  role: faker.helpers.arrayElement(roles),
  status: faker.helpers.arrayElement(statuses),
  lastLogin: faker.date.recent({ days: 30 }),
  createdAt: faker.date.past({ years: 2 }),
  updatedAt: new Date(),
})

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
