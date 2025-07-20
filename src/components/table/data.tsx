import { z } from 'zod'

import {
  CaretDownIcon,
  CaretUpIcon,
  CheckCircleIcon,
  EmptyIcon,
  EqualsIcon,
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
  { value: 'failed', label: 'Failed', icon: EmptyIcon, },
]

export const priorities = [
  { label: 'Low', value: 'low', icon: CaretDownIcon },
  { label: 'Medium', value: 'medium', icon: EqualsIcon },
  { label: 'High', value: 'high', icon: CaretUpIcon },
]
