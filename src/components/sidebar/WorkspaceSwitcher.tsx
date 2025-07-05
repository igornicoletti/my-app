import { useState } from 'react'

import { CaretUpDownIcon, CheckIcon } from '@phosphor-icons/react'

import {
  Avatar, AvatarFallback,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar
} from '@/components'

type WorkspacesValues = {
  name: string
  createdBy: string
}

export const WorkspaceSwitcher = ({ workspaces }: { workspaces: WorkspacesValues[] }) => {
  const { isMobile } = useSidebar()
  const [isActive, setIsActive] = useState(workspaces[0])

  if (!isActive) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {workspaces.length === 1 ? (
          <SidebarMenuButton size='lg'>
            <div className='flex flex-1 items-center gap-2'>
              <Avatar className='rounded-sm'>
                <AvatarFallback className='rounded-sm bg-sidebar-primary text-sidebar-primary-foreground'>
                  {isActive.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate text-sm font-medium'>{isActive.name}</span>
                <span className='truncate text-xs text-muted-foreground'>{isActive.createdBy}</span>
              </div>
            </div>
          </SidebarMenuButton>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent'>
                <div className='flex flex-1 items-center gap-2'>
                  <Avatar className='rounded-sm'>
                    <AvatarFallback className='rounded-sm bg-sidebar-primary text-sidebar-primary-foreground'>
                      {isActive.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate text-sm font-medium'>{isActive.name}</span>
                    <span className='truncate text-xs text-muted-foreground'>{isActive.createdBy}</span>
                  </div>
                </div>
                <CaretUpDownIcon />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='start' className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'>
              <DropdownMenuLabel className="text-muted-foreground text-xs">Workspaces</DropdownMenuLabel>
              {workspaces.map((workspace) => (
                <DropdownMenuItem key={workspace.name} onClick={() => setIsActive(workspace)}>
                  <div className='flex flex-1 items-center gap-2'>
                    <Avatar className='rounded-sm size-6'>
                      <AvatarFallback className='rounded-sm text-xs'>{workspace.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate text-xs text-muted-foreground'>{workspace.name}</span>
                    </div>
                  </div>
                  {isActive.name === workspace.name && <CheckIcon />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
