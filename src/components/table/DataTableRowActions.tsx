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
  DropdownMenuTrigger,
} from '@/components'
import { useAlert } from '@/contexts'
import { userSchema } from '@/schemas'

export const DataTableRowActions = <TData,>({ row }: { row: Row<TData> }) => {
  const { openDialog } = useAlert()

  const parsed = userSchema.safeParse(row.original)
  if (!parsed.success) return null

  const user = parsed.data

  const handleEdit = () => {
    console.log('Edit user:', user)
  }

  const handleDelete = () => {
    openDialog({
      onConfirm: () => console.log('Delete user:', user)
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
        <DropdownMenuLabel className='text-muted-foreground'>Actions Menu</DropdownMenuLabel>
        <DropdownMenuItem onSelect={handleEdit}>
          <PencilSimpleIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => navigator.clipboard.writeText(user.id)}>
          <CopySimpleIcon />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleDelete}>
          <TrashSimpleIcon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
