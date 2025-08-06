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
import { useConfirm } from '@/contexts'
import type { TRowActionsProps } from '@/types'
import { DotsThreeIcon } from '@phosphor-icons/react'

export const RowActions = ({ actions }: TRowActionsProps) => {
  const { confirm } = useConfirm()

  const handleActionClick = async (action: TRowActionsProps['actions'][number]) => {
    if (action.type === 'confirm') {
      const isConfirmed = await confirm({
        title: action.confirmTitle,
        description: action.confirmDescription,
        confirmText: action.confirmText,
        cancelText: action.cancelText,
      })
      if (isConfirmed) {
        action.onConfirm?.()
      }
    } else if (action.type === 'item') {
      action.onSelect()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Open menu" variant="ghost" size="sm" className="data-[state=open]:bg-muted">
          <DotsThreeIcon weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {actions.map((action, index) =>
          action.type === 'item' || action.type === 'confirm' ? (
            <DropdownMenuItem
              key={index}
              onSelect={() => handleActionClick(action)}
              disabled={action.disabled}>
              {action.icon && <action.icon />}
              <span className="truncate capitalize">{action.label}</span>
            </DropdownMenuItem>
          ) : action.type === 'radio-group' ? (
            <DropdownMenuSub key={index}>
              <DropdownMenuSubTrigger>
                {action.icon && <action.icon className="mr-2" />}
                <span className="truncate capitalize">{action.label}</span>
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
                      <span className="truncate capitalize">{opt.label}</span>
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
}
