import { useState } from 'react'

import {
  Avatar, AvatarFallback,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar
} from '@/components'
import { CaretUpDownIcon, CheckIcon } from '@phosphor-icons/react'

type WorkspacesValues = {
  name: string
  createdBy: string
}

export const WorkspaceSwitcher = ({ workspaces }: { workspaces: WorkspacesValues[] }) => {
  const { isMobile } = useSidebar()
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0])

  if (!activeWorkspace) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent'>
              <Avatar className='rounded-sm'>
                <AvatarFallback className='rounded-sm bg-sidebar-primary text-sidebar-primary-foreground'>{activeWorkspace.name[0]}</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left leading-tight'>
                <span className='truncate text-sm font-medium'>{activeWorkspace.name}</span>
                <span className='truncate text-xs text-muted-foreground'>{activeWorkspace.createdBy}</span>
              </div>
              <CaretUpDownIcon />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='start' className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'>
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.name} onClick={() => setActiveWorkspace(workspace)}>
                <Avatar className='rounded-sm size-6'>
                  <AvatarFallback className='rounded-sm text-xs'>{workspace.name[0]}</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left leading-tight'>
                  <span className='truncate text-xs text-muted-foreground'>{workspace.name}</span>
                </div>
                {activeWorkspace.name === workspace.name && (
                  <CheckIcon />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
