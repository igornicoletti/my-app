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
      <Button aria-label='Open row actions' variant='ghost' size='sm'>
        <DotsThreeIcon weight='bold' />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end'>
      {actions.map((action, index) =>
        action.type === 'item' ? (
          <DropdownMenuItem
            key={index}
            onSelect={action.onSelect}
            disabled={action.disabled}>
            {action.label}
          </DropdownMenuItem>
        ) : action.type === 'radio-group' ? (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger>{action.label}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={action.value}
                onValueChange={action.onChange}>
                {action.options.map((opt) => (
                  <DropdownMenuRadioItem
                    key={opt.value}
                    value={opt.value}
                    disabled={action.disabled}
                    className='capitalize'>
                    {opt.label}
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
