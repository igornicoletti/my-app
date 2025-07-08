import { Link } from 'react-router-dom'

import { CaretRightIcon } from '@phosphor-icons/react'

import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
  SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem
} from '@/components'
import type { NavigationValues } from '@/utils'

export const NavigationTree = ({ items }: { items: NavigationValues[] }) => (
  <SidebarGroup>
    <SidebarGroupLabel>Main</SidebarGroupLabel>
    <SidebarMenu>
      {items.map((item) => (
        <Collapsible key={item.title} asChild defaultOpen={item.isGroupActive}>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
              <Link to={item.url}>
                {item.Icon && <item.Icon />}
                {item.title}
              </Link>
            </SidebarMenuButton>
            {item.subItems && item.subItems.length > 0 ? (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className='data-[state=open]:rotate-90'>
                    <CaretRightIcon />
                    <span className='sr-only'>Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                          <Link to={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            ) : null}
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  </SidebarGroup>
)
