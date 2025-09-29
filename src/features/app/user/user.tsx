import { UserTable } from '@/features/app/user/components/table/table'

export const AppUser = () => (
  <div className='flex flex-col gap-2'>
    <div className='flex flex-col gap-2 p-2'>
      <h2 className='text-xl font-bold'>User Management</h2>
      <p className='text-sm text-muted-foreground'>
        Manage application users, assign roles, and control access permissions.
      </p>
    </div>
    <UserTable />
  </div>
)
