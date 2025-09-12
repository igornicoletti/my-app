import { CircuitryIcon, CpuIcon, MemoryIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

import { NavigationMain } from '@/components/sidebar/navigation-main'
import { TeamSwitcher } from '@/components/sidebar/team-switcher'
import { NavUser } from '@/components/sidebar/user-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { routeNavigations } from '@/routes/config/navigation-routes'

const data = {
  user: {
    name: 'Igor Nicoletti',
    email: 'igor93nicoletti@gmail.com',
    avatar: 'https://github.com/igornicoletti.png',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: CircuitryIcon,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corporation',
      logo: CpuIcon,
      plan: 'Startup',
    },
    {
      name: 'Evil Company',
      logo: MemoryIcon,
      plan: 'Free',
    },
  ]
}

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {routeNavigations.map((group) => (
          <NavigationMain
            key={group.label}
            label={group.label}
            items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
