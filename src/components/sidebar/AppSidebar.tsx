import {
  CircuitryIcon,
  CpuIcon,
  MemoryIcon
} from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

import { NavigationMain } from '@/components/sidebar/NavigationMain'
import { TeamSwitcher } from '@/components/sidebar/TeamSwitcher'
import { NavUser } from '@/components/sidebar/UserMenu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { routeNavigations } from '@/routes'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: CircuitryIcon,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: CpuIcon,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
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
