import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useBreadcrumb } from '@/hooks/use-breadcrumb'
import { Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

export const CommonBreadcrumb = () => {
  const crumbs = useBreadcrumb()
  if (!crumbs.length) return null
  const lastCrumb = crumbs[crumbs.length - 1]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='md:hidden'>
          <BreadcrumbPage>{lastCrumb.name}</BreadcrumbPage>
        </BreadcrumbItem>
        {crumbs.map((crumb, index) => (
          <Fragment key={crumb.name + index}>
            <BreadcrumbItem className='hidden md:inline-flex'>
              {crumb.isCurrent || !crumb.path ? (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb.path}>{crumb.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < crumbs.length - 1 && (
              <BreadcrumbSeparator className='hidden md:inline-flex' />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
