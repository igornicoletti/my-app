import { useState } from 'react'

import { CaretUpDownIcon, CheckIcon } from '@phosphor-icons/react'

import {
  Avatar, AvatarFallback,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from '@/components'

type WorkspacesValues = {
  name: string
  createdBy: string
}

const UserAvatar = ({ name, createdBy }: WorkspacesValues) => (
  <div className='flex items-center gap-2'>
    <Avatar className='rounded-lg text-sidebar-primary-foreground'>
      <AvatarFallback className='rounded-lg bg-sidebar-primary'>{name[0]}</AvatarFallback>
    </Avatar>
    <div className='grid flex-1 text-left text-sm leading-tight'>
      <span className='truncate font-medium'>{name}</span>
      <span className='truncate text-xs text-muted-foreground'>{createdBy}</span>
    </div>
  </div>
)

export const WorkspaceSwitcher = ({ workspaces }: { workspaces: WorkspacesValues[] }) => {
  const [isActive, setIsActive] = useState(workspaces[0])

  if (!isActive) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {workspaces.length === 1 ? (
          <SidebarMenuButton size='lg'>
            <UserAvatar {...isActive} />
          </SidebarMenuButton>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent'>
                <UserAvatar {...isActive} />
                <CaretUpDownIcon className='ml-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='bottom' align='start' className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'>
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
