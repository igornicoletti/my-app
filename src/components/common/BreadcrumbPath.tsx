import { Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'

export const BreadcrumbPath = () => {
  const crumbs = useBreadcrumb()
  if (!crumbs.length) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='md:hidden'>
          <BreadcrumbPage>
            {crumbs[crumbs.length - 1].name}
          </BreadcrumbPage>
        </BreadcrumbItem>
        {crumbs.map((crumb) => (
          <Fragment key={crumb.path}>
            <BreadcrumbItem className='hidden md:inline-flex'>
              {crumb.isCurrent ? (
                <BreadcrumbPage>
                  {crumb.name}
                </BreadcrumbPage>
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
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
