import { DotsThreeOutlineIcon } from '@phosphor-icons/react'
import type { Row } from '@tanstack/react-table'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  labels,
  taskSchema
} from '@/components'
import { useAlert } from '@/contexts'

export const DataTableRowActions = <TData,>({ row }: { row: Row<TData> }) => {
  const { openDialog } = useAlert()

  const parsed = taskSchema.safeParse(row.original)
  if (!parsed.success) return null

  const task = parsed.data

  // Placeholder callbacks – to be connected later
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
        <Button
          size='icon'
          variant='ghost'
          className='data-[state=open]:bg-muted size-8'
          aria-label='Open row actions menu'>
          <DotsThreeOutlineIcon weight='fill' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={handleDelete} variant='destructive'>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
