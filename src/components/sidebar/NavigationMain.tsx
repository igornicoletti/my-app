import { CaretRightIcon } from '@phosphor-icons/react'
import {
  Link,
  useLocation
} from 'react-router-dom'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import type { Navigation } from '@/routes/config'

export const NavigationMain = ({ label, items }: Navigation) => {
  const { pathname } = useLocation()

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            asChild
            key={item.url ?? item.title}
            defaultOpen={item.isActive || item.items?.some(sub => sub.url === pathname)}
            className='group/collapsible'>
            <SidebarMenuItem>
              {!item.items || item.items?.length === 0 ? (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={item.url === pathname}>
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              ) : (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.items.some((sub) => sub.url === pathname)}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <CaretRightIcon className='ml-auto group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.url === pathname}>
                            <Link to={subItem.url}>
                              {subItem.icon && <subItem.icon />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
