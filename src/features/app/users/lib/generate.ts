import { roles, statuses, type UserSchema } from '@/features/app/users/lib/schemas'
import { generateId } from '@/lib/id'
import { faker } from '@faker-js/faker'

export const generateRandomUser = (): UserSchema => ({
  id: generateId('user'),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.helpers.replaceSymbols('+## (##) # #### ####'),
  role: faker.helpers.arrayElement(Object.values(roles)),
  status: faker.helpers.arrayElement(Object.values(statuses)),
  lastLogin: faker.date.recent({ days: 30 }),
  createdAt: faker.date.past({ years: 2 }),
  updatedAt: new Date(),
})
