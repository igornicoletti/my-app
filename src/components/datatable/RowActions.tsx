import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { TRowActionsProps } from '@/types'
import { DotsThreeIcon } from '@phosphor-icons/react'

export const RowActions = ({ actions }: TRowActionsProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button aria-label='Open menu' variant='ghost' size='sm' className='data-[state=open]:bg-muted'>
        <DotsThreeIcon weight='bold' />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end' className='w-40'>
      {actions.map((action, index) =>
        action.type === 'item' ? (
          <DropdownMenuItem
            key={index}
            onSelect={action.onSelect}
            disabled={action.disabled}>
            {action.icon && <action.icon />}
            <span className='truncate capitalize'>{action.label}</span>
          </DropdownMenuItem>
        ) : action.type === 'radio-group' ? (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger>
              {action.icon && <action.icon className='mr-2' />}
              <span className='truncate capitalize'>{action.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={action.value}
                onValueChange={action.onChange}>
                {action.options.map((opt) => (
                  <DropdownMenuRadioItem
                    key={opt.value}
                    value={opt.value}
                    disabled={action.disabled}>
                    <span className='truncate capitalize'>{opt.label}</span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ) : null
      )}
    </DropdownMenuContent>
  </DropdownMenu>
)
