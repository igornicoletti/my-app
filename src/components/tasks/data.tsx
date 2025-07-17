import { z } from 'zod'

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ProhibitIcon,
  TimerIcon
} from '@phosphor-icons/react'

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

export const labels = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
  { value: 'documentation', label: 'Documentation' }]

export const statuses = [
  { value: 'in progress', label: 'In Progress', icon: TimerIcon, },
  { value: 'done', label: 'Done', icon: CheckCircleIcon, },
  { value: 'canceled', label: 'Canceled', icon: ProhibitIcon, },
]

export const priorities = [
  { label: 'Low', value: 'low', icon: ArrowDownIcon },
  { label: 'Medium', value: 'medium', icon: ArrowRightIcon },
  { label: 'High', value: 'high', icon: ArrowUpIcon },
]
