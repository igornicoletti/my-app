import { faker } from '@faker-js/faker'
import { userSchema } from './users.schemas'
import type { UserSchema } from './users.types'

const generateUser = (): UserSchema => {
  const roles: UserSchema['roles'][] = ['admin', 'owner', 'viewer']
  const statuses: UserSchema['status'][] = ['done', 'blocked', 'in-progress']

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

export const userLoader = async (): Promise<UserSchema[]> => {
  await new Promise((r) => setTimeout(r, 500))
  const user: UserSchema[] = Array.from({ length: 10 }, () => generateUser())
  return user
}
