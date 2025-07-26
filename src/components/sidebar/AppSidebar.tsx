import {
  NavigationTree,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  UserMenu,
  WorkspaceSwitcher
} from '@/components'
import { useAuth } from '@/contexts'
import { useNavigation } from '@/hooks'

const workspaceData = [{
  title: '2Ti Corp.',
  description: 'Enterprise',
  avatar: '',
}]

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const navigationData = useNavigation()
  const { user } = useAuth()

  if (!user) return null

  const { displayName, email, photoURL } = user
  const userData = {
    title: displayName ?? '',
    description: email ?? '',
    avatar: photoURL ?? '',
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspace={workspaceData} />
      </SidebarHeader>
      <SidebarContent>
        <NavigationTree navigation={navigationData} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
