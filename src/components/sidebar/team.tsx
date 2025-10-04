import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { CaretUpDownIcon, PlusIcon } from '@phosphor-icons/react'
import { useState, type ElementType } from 'react'

interface SidebarTeamProps {
  name: string
  logo: ElementType
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
              <div className='bg-primary text-primary-foreground flex aspect-square size-8 p-1 items-center justify-center rounded-lg'>
                <activeTeam.logo className='size-full' />
              </div>
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
            <DropdownMenuLabel>
              Teams
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {teams.map((team, index) => (
                <DropdownMenuItem key={team.name} onSelect={() => setActiveTeam(team)} className='gap-2'>
                  <div className='bg-muted flex size-6 p-1 items-center justify-center rounded-md'>
                    <team.logo className='size-full shrink-0' />
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2'>
              <div className='bg-muted flex size-6 p-1 items-center justify-center rounded-md'>
                <PlusIcon className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
