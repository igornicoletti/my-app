import { faker } from '@faker-js/faker'

import { roles, statuses, type UserSchema } from '@/features/app/users/lib/schemas'
import { generateId } from '@/lib/id'

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
