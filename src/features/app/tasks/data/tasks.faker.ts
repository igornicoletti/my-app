import type { TTaskProps } from '@/features/app/tasks'
import { faker } from '@faker-js/faker'

const statuses: TTaskProps['status'][] = ['todo', 'in-progress', 'done', 'canceled']
const priorities: TTaskProps['priority'][] = ['low', 'medium', 'high']
const labels: TTaskProps['label'][] = ['bug', 'documentation', 'feature', 'enhancement']

export const generateTasks = (count: 10): TTaskProps[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    code: faker.string.alphanumeric(6).toUpperCase(),
    title: faker.hacker.phrase(),
    status: faker.helpers.arrayElement(statuses),
    priority: faker.helpers.arrayElement(priorities),
    label: faker.helpers.arrayElement(labels),
    createdAt: faker.date.past().toISOString(),
  }))
}
