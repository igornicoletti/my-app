import React from 'react'
import { Link } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components'
import { useCrumbs } from '@/hooks'

export const BreadcrumbPath = () => {
  const crumbs = useCrumbs()
  if (!crumbs.length) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='md:hidden'>
          <BreadcrumbPage>{crumbs[crumbs.length - 1].name}</BreadcrumbPage>
        </BreadcrumbItem>
        {crumbs.map((crumb) => (
          <React.Fragment key={crumb.path}>
            <BreadcrumbItem className='hidden md:inline-flex'>
              {crumb.isCurrent ? (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb.path}>
                    {crumb.name}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!crumb.isCurrent && (
              <BreadcrumbSeparator className='hidden md:inline-flex' />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
