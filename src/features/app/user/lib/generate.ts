import { roles, statuses, type UserSchema } from '@/features/app/user/lib/schema'
import { generateId } from '@/libs/id'
import { faker } from '@faker-js/faker'

export const userGenerate = (): UserSchema => ({
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
