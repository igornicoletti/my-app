import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from '@/components/ui/sidebar'
import type { NavigationGroup, NavigationItem } from '@/constants/navigation'
import { CaretRightIcon } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'

interface SidebarNavigationItemProps {
  item: NavigationItem
}

const SidebarNavigationItem = ({ item }: SidebarNavigationItemProps) => {
  const { pathname } = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()

  const hasSubItems = !!item.items?.length
  const isCurrentActive = item.url === pathname
  const isParentActive = hasSubItems && item.items!.some((sub) => sub.url === pathname)
  const isActive = isCurrentActive || isParentActive

  const handleClose = () => {
    if (isMobile) {
      setTimeout(() => setOpenMobile(false), 300)
    }
  }

  if (!hasSubItems) {
    return (
      <SidebarMenuItem key={item.url}>
        <SidebarMenuButton asChild tooltip={item.title} isActive={isCurrentActive}>
          <Link to={item.url} onClick={handleClose}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Collapsible asChild key={item.url} defaultOpen={isActive} className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} isActive={isActive}>
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
  navigation: NavigationGroup[]
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
