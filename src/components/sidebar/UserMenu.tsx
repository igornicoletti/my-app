
import {
  CaretUpDownIcon,
  ListMagnifyingGlassIcon,
  MoonIcon,
  RocketLaunchIcon,
  SignOutIcon,
  SlidersHorizontalIcon,
  SunIcon,
  UserIcon
} from '@phosphor-icons/react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components'
import { useCommand, useTheme } from '@/contexts'
import { useShortcut } from '@/hooks'
import { authService } from '@/services'

type User = {
  title: string
  description?: string
  avatar?: string
}

export const UserMenu = ({ user }: { user: User }) => {
  const { isMobile } = useSidebar()
  const { openCommand } = useCommand()
  const { theme, toggleTheme } = useTheme()

  const handleTheme = useShortcut(['meta+J', 'ctrl+J'], toggleTheme)
  const handleCommand = useShortcut(['meta+k', 'ctrl+k'], openCommand)
  const handleLogout = useShortcut(['meta+q', 'ctrl+q'], () => authService.signOut())

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent'>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.title} />
                <AvatarFallback>{user.title[0]}</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.title}</span>
                <span className='truncate text-xs text-muted-foreground'>{user.description}</span>
              </div>
              <CaretUpDownIcon className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='end' className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'>
            <DropdownMenuLabel>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.title}</span>
                <span className='truncate text-xs text-muted-foreground'>{user.description}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className='my-2'>
              <DropdownMenuItem>
                <UserIcon />
                Account Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup className='my-2'>
              <DropdownMenuItem>
                <SlidersHorizontalIcon />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTheme}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                <DropdownMenuShortcut>⌘J</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCommand}>
                <ListMagnifyingGlassIcon />
                Command Menu
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup className='my-2'>
              <DropdownMenuItem onClick={handleLogout}>
                <SignOutIcon />
                Log Out
                <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Button className='w-full'>
              <RocketLaunchIcon />
              Upgrade to Pro
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
