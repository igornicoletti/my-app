import {
  CaretUpDownIcon,
  ListMagnifyingGlassIcon,
  MoonIcon,
  RocketLaunchIcon,
  SignOutIcon,
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
import { authService } from '@/services'

type User = {
  title: string
  description?: string
  avatar?: string
}

export const UserMenu = ({ user }: { user: User }) => {
  const { theme, toggleTheme } = useTheme()
  const { openCommand } = useCommand()
  const { isMobile } = useSidebar()

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
                <span className='truncate font-semibold'>{user.title}</span>
                <span className='truncate text-xs text-muted-foreground'>{user.description}</span>
              </div>
              <CaretUpDownIcon className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='end' className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'>
            <DropdownMenuLabel>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.title}</span>
                <span className='truncate text-xs text-muted-foreground'>{user.description}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className='my-2'>
              <DropdownMenuItem>
                <UserIcon />
                Account Settings
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup className='my-2'>
              <DropdownMenuItem onSelect={toggleTheme}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                <DropdownMenuShortcut>⌘J</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={openCommand}>
                <ListMagnifyingGlassIcon />
                Command Menu
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup className='my-2'>
              <DropdownMenuItem onSelect={() => authService.signOut()}>
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
