import { CaretUpDownIcon, PlusIcon } from '@phosphor-icons/react'
import { useState, type ElementType } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'

interface Teams {
  name: string
  logo: ElementType
  plan: string
}

export const TeamSwitcher = ({ teams }: { teams: Teams[] }) => {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = useState(teams[0])

  if (!activeTeam) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <Avatar className='rounded-lg'>
                <AvatarFallback className='rounded-lg uppercase'>
                  {activeTeam.logo
                    ? <activeTeam.logo className='size-6' />
                    : activeTeam.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{activeTeam.name}</span>
                <span className='truncate text-xs'>{activeTeam.plan}</span>
              </div>
              <CaretUpDownIcon className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            sideOffset={4}
            side={isMobile ? 'bottom' : 'right'}
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 origin-[var(--radix-dropdown-menu-content-transform-origin)]'>
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Workspaces
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className='p-2'>
                <team.logo />
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='p-2'>
              <PlusIcon />
              Add Workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
