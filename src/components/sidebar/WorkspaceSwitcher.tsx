import { useState } from 'react'

import { CaretUpDownIcon, PlusIcon } from '@phosphor-icons/react'

import {
  AvatarContent,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
  type AvatarValues
} from '@/components'

export const WorkspaceSwitcher = ({ workspaces }: { workspaces: AvatarValues[] }) => {
  const { isMobile } = useSidebar()
  const [isActive, setIsActive] = useState(workspaces[0])

  if (!isActive) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {workspaces.length === 1 ? (
          <SidebarMenuButton size='lg'>
            <AvatarContent {...isActive} />
          </SidebarMenuButton>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent'>
                <AvatarContent {...isActive} />
                <CaretUpDownIcon className='ml-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='start' className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'>
              <DropdownMenuLabel className='text-muted-foreground text-xs'>
                Workspaces
              </DropdownMenuLabel>
              {workspaces.map((workspace, index) => (
                <DropdownMenuItem key={workspace.title} onClick={() => setIsActive(workspace)}>
                  <div className='flex size-6 items-center justify-center rounded-sm border'>
                    {workspace.title[0]}
                  </div>
                  {workspace.title}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <PlusIcon />
                </div>
                Add workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
