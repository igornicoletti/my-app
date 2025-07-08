import { useNavigate } from 'react-router-dom'

import { CaretUpDownIcon, GearIcon, RocketLaunchIcon, SignOutIcon, SlidersHorizontalIcon, UserIcon } from '@phosphor-icons/react'

import {
  AvatarContent,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
  type AvatarValues
} from '@/components'
import { authService } from '@/services'


export const UserMenu = ({ user }: { user: AvatarValues }) => {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent'>
              <AvatarContent {...user} />
              <CaretUpDownIcon className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='end' className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'>
            <DropdownMenuLabel>
              <AvatarContent {...user} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex-col items-start'>
              <div className='flex items-center gap-1'>
                <RocketLaunchIcon />
                <span className='truncate text-sm font-medium'>Upgrade</span>
              </div>
              <span className='truncate text-xs text-muted-foreground'>
                You&apos;re on a free version of App.
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SlidersHorizontalIcon />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GearIcon />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              authService.signOut()
              navigate('/login')
            }}>
              <SignOutIcon />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
