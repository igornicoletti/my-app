import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from '@/components/ui/sidebar'
import type { Navigation, NavigationItem } from '@/routes/config/navigation'
import { CaretRightIcon } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'

interface SidebarNavigationItemProps {
  item: NavigationItem
}

const SidebarNavigationItem = ({ item }: SidebarNavigationItemProps) => {
  const { pathname } = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()
  const hasSubItems = item.items && item.items.length > 0
  const isParentActive = item.items?.some((sub) => sub.url === pathname)

  const handleClose = () => {
    if (isMobile) {
      setTimeout(() => setOpenMobile(false), 300)
    }
  }

  return !hasSubItems ? (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton asChild tooltip={item.title} isActive={item.url === pathname}>
        <Link to={item.url} onClick={handleClose}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ) : (
    <Collapsible
      asChild
      key={item.url}
      defaultOpen={item.isActive || isParentActive}
      className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} isActive={isParentActive}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <CaretRightIcon className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items!.map((subItem) => (
              <SidebarMenuSubItem key={subItem.url}>
                <SidebarMenuSubButton asChild isActive={subItem.url === pathname}>
                  <Link to={subItem.url} onClick={handleClose}>
                    {subItem.icon && <subItem.icon />}
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

interface SidebarNavigationProps {
  navigation: Navigation[]
}

export const SidebarNavigation = ({ navigation }: SidebarNavigationProps) => {
  return (
    <>
      {navigation.map((nav) => (
        <SidebarGroup key={nav.label}>
          {nav.label && <SidebarGroupLabel>{nav.label}</SidebarGroupLabel>}
          <SidebarMenu>
            {nav.items.map((item) => (
              <SidebarNavigationItem key={item.url} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
