import { faker } from '@faker-js/faker'

import {
  userSchema,
  type UserSchema
} from '@/schemas'

const generateUser = (): UserSchema => {
  const roles: UserSchema['roles'][] = ['admin', 'owner', 'viewer']
  const statuses: UserSchema['status'][] = ['active', 'inactive', 'suspended']

  const createdAt = faker.date.past({ years: 1 })
  const updatedAt = faker.date.between({ from: createdAt, to: new Date() })

  return userSchema.parse({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    roles: faker.helpers.arrayElement(roles),
    status: faker.helpers.arrayElement(statuses),
    createdAt,
    updatedAt,
  })
}

export const usersLoader = async (): Promise<UserSchema[]> => {
  await new Promise((r) => setTimeout(r, 500))
  const users: UserSchema[] = Array.from({ length: 10 }, () => generateUser())
  return users
}
