import {
  DotsThreeIcon,
  EyeIcon,
  PencilSimpleIcon,
  TrashSimpleIcon
} from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export const RowAction = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label='Open menu' variant='ghost' className='flex size-8 p-0 data-[state=open]:bg-muted'>
          <DotsThreeIcon aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuItem>
          <EyeIcon />
          View detail
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PencilSimpleIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <TrashSimpleIcon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
