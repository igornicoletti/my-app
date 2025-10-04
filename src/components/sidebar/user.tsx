import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Kbd } from '@/components/ui/kbd'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { useCommand } from '@/providers/command'
import { ServiceAuth } from '@/services/auth'
import { BellSimpleIcon, CaretUpDownIcon, MagnifyingGlassIcon, SignOutIcon, UserCheckIcon } from '@phosphor-icons/react'
import type { User } from 'firebase/auth'

const SidebarAvatar = ({ user }: { user: User }) => (
  <div className='flex items-center gap-2 text-left'>
    <Avatar className='rounded-lg'>
      <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? undefined} />
      <AvatarFallback className='rounded-lg'>
        {user.displayName?.[0] ?? user.email?.[0] ?? '?'}
      </AvatarFallback>
    </Avatar>
    <div className='grid flex-1 text-left text-sm leading-tight'>
      <span className='truncate font-medium'>{user.displayName}</span>
      <span className='truncate text-xs'>{user.email}</span>
    </div>
  </div>
)

export const SidebarUser = ({ user }: { user: User }) => {
  const { isMobile, setOpenMobile } = useSidebar()
  const { openCommand } = useCommand()

  const handleLogout = () => {
    setOpenMobile(false)
    setTimeout(() => void ServiceAuth.signOut(), 500)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <SidebarAvatar user={user} />
              <CaretUpDownIcon className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            sideOffset={4}
            side={isMobile ? 'bottom' : 'right'}
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 origin-[var(--radix-dropdown-menu-content-transform-origin)]'>
            <DropdownMenuItem>
              <SidebarAvatar user={user} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCheckIcon />
                Account
                <Kbd className='ml-auto'>⇧⌘P</Kbd>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={openCommand}>
                <MagnifyingGlassIcon />
                Search
                <Kbd className='ml-auto'>⌘K</Kbd>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellSimpleIcon />
                Notifications
                <Kbd className='ml-auto'>⌘N</Kbd>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>
              <SignOutIcon />
              Log out
              <Kbd className='ml-auto'>⇧⌘Q</Kbd>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
