import {
  CopySimpleIcon,
  DotsThreeVerticalIcon,
  PencilSimpleIcon,
  TrashSimpleIcon
} from '@phosphor-icons/react'
import type { Row } from '@tanstack/react-table'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  taskSchema
} from '@/components'
import { useAlert } from '@/contexts'

export const DataTableRowActions = <TData,>({ row }: { row: Row<TData> }) => {
  const { openDialog } = useAlert()

  const parsed = taskSchema.safeParse(row.original)
  if (!parsed.success) return null

  const task = parsed.data

  const handleEdit = () => {
    console.log('Edit task:', task)
  }

  const handleDelete = () => {
    openDialog({
      onConfirm: () => console.log('Delete task:', task)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <DotsThreeVerticalIcon weight='bold' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuLabel className='text-muted-foreground text-xs'>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleEdit}>
          <PencilSimpleIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => navigator.clipboard.writeText(task.id)}>
          <CopySimpleIcon />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleDelete} variant='destructive'>
          <TrashSimpleIcon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
