import { useState } from 'react'

import { CaretUpDownIcon, PlusIcon } from '@phosphor-icons/react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components'

type WorkspaceItem = {
  title: string
  description?: string | undefined
  avatar?: string | undefined
}

export const WorkspaceSwitcher = ({ workspace }: { workspace: WorkspaceItem[] }) => {
  const [isActive, setIsActive] = useState(workspace[0])
  const { isMobile } = useSidebar()

  if (!isActive) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent'>
              <Avatar className='rounded-sm'>
                <AvatarImage src={isActive.avatar} alt={isActive.title} />
                <AvatarFallback className='rounded-sm'>{isActive.title[0]}</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{isActive.title}</span>
                <span className='truncate text-xs text-muted-foreground'>
                  {isActive.description}
                </span>
              </div>
              <CaretUpDownIcon className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='start' className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'>
            <DropdownMenuLabel className='text-muted-foreground text-xs'>Workspaces</DropdownMenuLabel>
            {workspace.map((item, index) => (
              <DropdownMenuItem key={index} onClick={() => setIsActive(item)}>
                <Avatar className='rounded-sm size-6'>
                  <AvatarFallback className='rounded-sm bg-transparent'>{item.title[0]}</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{item.title}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Avatar className='size-6 rounded-sm'>
                <AvatarFallback className='rounded-sm bg-transparent'>
                  <PlusIcon />
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>Create Workspace</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
