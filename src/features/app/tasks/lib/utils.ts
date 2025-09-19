import type { TaskSchema } from '@/features/app/tasks/lib/schemas'
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckCircleIcon, CircleIcon, ProhibitIcon, TimerIcon, type IconProps } from '@phosphor-icons/react'

type IconComponent = React.ComponentType<IconProps>

export const statusIcons: Record<TaskSchema['status'], IconComponent> = {
  Canceled: ProhibitIcon,
  Done: CheckCircleIcon,
  'In progress': TimerIcon,
  Todo: CircleIcon,
}

export const priorityIcons: Record<TaskSchema['priority'], IconComponent> = {
  High: ArrowUpIcon,
  Low: ArrowDownIcon,
  Medium: ArrowRightIcon,
}
