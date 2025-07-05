import { Link } from 'react-router-dom'

import { CaretRightIcon } from '@phosphor-icons/react'

import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
  SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem
} from '@/components'
import type { SidebarValues } from '@/utils'

export const DynamicNavigation = ({ items }: { items: SidebarValues[] }) => (
  <SidebarGroup>
    <SidebarGroupLabel>Main</SidebarGroupLabel>
    <SidebarMenu>
      {items.map((item) => (
        <Collapsible key={item.title} asChild defaultOpen={item.isActive || item.items?.some(subItem => subItem.isActive)}>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive || item.items?.some(subItem => subItem.isActive)}>
              <Link to={item.url}>
                <item.icon />
                {item.title}
              </Link>
            </SidebarMenuButton>
            {item.items && item.items.length > 0 ? (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className='data-[state=open]:rotate-90'>
                    <CaretRightIcon />
                    <span className='sr-only'>Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
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