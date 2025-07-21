import { useState } from 'react'

import { CaretUpDownIcon } from '@phosphor-icons/react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
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
                <span className='truncate font-semibold'>{isActive.title}</span>
                <span className='truncate text-xs text-muted-foreground'>
                  {isActive.description}
                </span>
              </div>
              <CaretUpDownIcon className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='start' className='w-(--radix-dropdown-menu-trigger-width) rounded-lg'>
            <DropdownMenuLabel className='text-muted-foreground'>Workspaces</DropdownMenuLabel>
            {workspace.map((item, index) => (
              <DropdownMenuItem key={index} onClick={() => setIsActive(item)}>
                <Avatar className='rounded-sm size-6'>
                  <AvatarImage src={item.avatar} alt={item.title} />
                  <AvatarFallback className='rounded-sm bg-transparent'>{item.title[0]}</AvatarFallback>
                </Avatar>
                <span className='truncate'>{item.title}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <Button variant='ghost' className='w-full'>
              Create Workspace
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
