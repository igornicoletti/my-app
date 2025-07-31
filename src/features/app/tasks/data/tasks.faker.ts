import type { TTaskProps } from '@/features/app/tasks'
import { LABELS, PRIORITIES, STATUSES } from '@/features/app/tasks'
import { faker } from '@faker-js/faker'

export const generateTasks = (count = 10): TTaskProps[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    code: faker.string.alphanumeric(6).toUpperCase(),
    title: faker.hacker.phrase(),
    status: faker.helpers.arrayElement(STATUSES),
    priority: faker.helpers.arrayElement(PRIORITIES),
    label: faker.helpers.arrayElement(LABELS),
    createdAt: faker.date.past().toISOString()
  }))
}
