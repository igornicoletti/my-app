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
import { userSchema } from '@/features'

export const ActionMenu = <TData,>({ row }: { row: Row<TData> }) => {
  const { openDialog } = useAlert()

  const { success, data: user } = userSchema.safeParse(row.original)
  if (!success) return null

  const handleEdit = () => {
    console.log('Edit user:', user)
  }

  const handleDelete = () => {
    openDialog({
      onConfirm: () => console.log('Delete user:', user)
    })
  }

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(user.id)
    } catch (err) {
      console.error('Failed to copy user ID:', err)
    }
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
        <DropdownMenuLabel className='text-muted-foreground'>Actions</DropdownMenuLabel>
        <DropdownMenuItem onSelect={handleEdit}>
          <PencilSimpleIcon /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleCopyId}>
          <CopySimpleIcon /> Copy
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleDelete}>
          <TrashSimpleIcon /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
