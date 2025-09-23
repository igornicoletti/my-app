import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { UserSchema } from '@/features/app/user/lib/schemas'
import type { ComponentPropsWithRef } from 'react'

interface ViewUserProps extends ComponentPropsWithRef<typeof Dialog> {
  user: UserSchema | null
}

export const ViewUser = ({ user, ...props }: ViewUserProps) => {
  if (!user) return null

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected user
          </DialogDescription>
        </DialogHeader>
        <dl className='grid gap-3 sm:grid-cols-2'>
          <div>
            <dt className='text-sm font-medium'>Name</dt>
            <dd className='text-sm text-muted-foreground'>{user.name}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Email</dt>
            <dd className='text-sm text-muted-foreground'>{user.email}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Phone</dt>
            <dd className='text-sm text-muted-foreground'>{user.phone}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Status</dt>
            <dd className='text-sm text-muted-foreground'>{user.status}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Role</dt>
            <dd className='text-sm text-muted-foreground'>{user.role}</dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Created At</dt>
            <dd className='text-sm text-muted-foreground'>
              {user.createdAt.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className='text-sm font-medium'>Updated At</dt>
            <dd className='text-sm text-muted-foreground'>
              {user.updatedAt.toLocaleString()}
            </dd>
          </div>
        </dl>
      </DialogContent>
    </Dialog>
  )
}
