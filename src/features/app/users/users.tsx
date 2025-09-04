import { UsersTable } from '@/features/app/users/components/table/table'

export const UsersPage = () => (
  <div className='flex flex-col gap-6 px-2'>
    <div className='grid gap-2'>
      <h2 className='text-lg font-bold'>User Management</h2>
      <p className='text-sm text-muted-foreground'>
        Manage application users, assign roles, and control access permissions.
      </p>
    </div>
    <UsersTable />
  </div>
)
