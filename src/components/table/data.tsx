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
  { value: 'manager', label: 'Manager' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'admin', label: 'Admin' }]

export const statuses = [
  { value: 'processing', label: 'Processing', icon: TimerIcon, },
  { value: 'success', label: 'Success', icon: CheckCircleIcon, },
  { value: 'failed', label: 'Failed', icon: ProhibitIcon, },
]

export const priorities = [
  { label: 'Low', value: 'low', icon: ArrowDownIcon },
  { label: 'Medium', value: 'medium', icon: ArrowRightIcon },
  { label: 'High', value: 'high', icon: ArrowUpIcon },
]
