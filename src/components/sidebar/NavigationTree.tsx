import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components'
import type { NavigationProps } from '@/utils'
import { CaretRightIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export const NavigationTree = ({ navigation }: { navigation: NavigationProps[] }) => (
  <SidebarGroup>
    <SidebarMenu>
      {navigation.map((item, index) => (
        <Collapsible asChild key={index} defaultOpen={item.isGroupActive}>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
              <Link to={item.url}>
                {item.Icon && <item.Icon />}
                {item.title}
              </Link>
            </SidebarMenuButton>
            {item.subItems && item.subItems?.length > 0 && (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <CaretRightIcon />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subItems.map((sub, subIndex) => (
                      <SidebarMenuSubItem key={subIndex}>
                        <SidebarMenuSubButton asChild isActive={sub.isActive}>
                          <Link to={sub.url}>{sub.title}</Link>
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
