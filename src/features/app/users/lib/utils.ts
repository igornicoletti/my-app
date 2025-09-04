import { faker } from '@faker-js/faker'

import { roles, statuses, type UserSchema } from '@/features/app/users/lib/schemas'
import { generateId } from '@/lib/id'
import { CheckCircleIcon, CircleDashedIcon, ClockIcon, PencilSimpleIcon, ShieldIcon, ShieldStarIcon, UsersIcon, XCircleIcon } from '@phosphor-icons/react'

export const generateRandomUser = (): UserSchema => ({
  id: generateId('user'),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(roles),
  status: faker.helpers.arrayElement(statuses),
  lastLogin: faker.datatype.boolean() ? faker.date.recent({ days: 30 }) : undefined,
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

export const getRolesIcon = (roles: UserSchema['role']) => {
  const rolesIcons: Record<UserSchema['role'], any> = {
    Admin: ShieldStarIcon,
    Manager: UsersIcon,
    Editor: PencilSimpleIcon,
  }
  return rolesIcons[roles] || ShieldIcon
}
