import { SidebarNavigation } from '@/components/sidebar/navigation'
import { SidebarTeam } from '@/components/sidebar/team'
import { SidebarUser } from '@/components/sidebar/user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, } from '@/components/ui/sidebar'
import { routeNavigations } from '@/routes/config/navigation'
import { CircuitryIcon, CpuIcon, MemoryIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

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

export const SidebarApp = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarTeam teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {routeNavigations.map((group) => (
          <SidebarNavigation
            key={group.label}
            label={group.label}
            items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
