import { SidebarNavigation } from '@/components/sidebar/navigation'
import { SidebarTeam } from '@/components/sidebar/team'
import { SidebarUser } from '@/components/sidebar/user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { navigation } from '@/routes/config/navigation'
import { CodaLogoIcon, LastfmLogoIcon, NyTimesLogoIcon } from '@phosphor-icons/react'
import type { User } from 'firebase/auth'
import type { ComponentProps } from 'react'

const teams = [
  { name: 'Acme Inc', logo: NyTimesLogoIcon, plan: 'Enterprise' },
  { name: 'Acme Corp.', logo: CodaLogoIcon, plan: 'Startup' },
  { name: 'Evil Corp.', logo: LastfmLogoIcon, plan: 'Free' },
]

export const SidebarApp = ({
  user,
  ...props
}: ComponentProps<typeof Sidebar> & {
  user: User
}) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTeam teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation navigation={navigation} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
