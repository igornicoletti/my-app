import { TaskTable } from '@/features/app/task/components/table/table'

export const AppTask = () => (
  <div className='flex flex-col gap-2'>
    <div className='flex flex-col gap-2 p-2'>
      <h2 className='text-xl font-bold'>Task Management</h2>
      <p className='text-sm text-muted-foreground'>
        Here's a list of your tasks! Manage ongoing tasks or add new ones.
      </p>
    </div>
    <TaskTable />
  </div>
)
