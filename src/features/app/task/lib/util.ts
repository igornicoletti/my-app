import type { TaskSchema } from '@/features/app/task/lib/schema'
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckCircleIcon, CircleIcon, ProhibitIcon, TimerIcon, type IconProps } from '@phosphor-icons/react'

type IconComponent = React.ComponentType<IconProps>

export const statusIcons: Record<TaskSchema['status'], IconComponent> = {
  Todo: CircleIcon,
  'In progress': TimerIcon,
  Done: CheckCircleIcon,
  Canceled: ProhibitIcon,
}

export const priorityIcons: Record<TaskSchema['priority'], IconComponent> = {
  Low: ArrowDownIcon,
  Medium: ArrowRightIcon,
  High: ArrowUpIcon,
}
