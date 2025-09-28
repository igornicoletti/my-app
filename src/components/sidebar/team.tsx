import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { CaretUpDownIcon } from '@phosphor-icons/react'
import { useState, type ElementType } from 'react'

interface SidebarTeamProps {
  name: string
  logo?: ElementType
  plan?: string
}

export const SidebarTeam = ({ teams }: { teams: SidebarTeamProps[] }) => {
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
                <AvatarFallback className='rounded-lg'>
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
            <DropdownMenuGroup>
              {teams.map((team, index) => (
                <DropdownMenuItem key={team.name} onSelect={() => setActiveTeam(team)} className='gap-2 p-2'>
                  <Avatar className='rounded-lg'>
                    <AvatarFallback className='rounded-lg bg-transparent border-2'>
                      {team.logo
                        ? <team.logo className='size-6' />
                        : team.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>{team.name}</span>
                    <span className='truncate text-xs'>{team.plan}</span>
                  </div>
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Add Workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
