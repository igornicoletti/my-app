import { TasksTable } from '@/features/app/tasks/components/table/table'

export const TasksPage = () => (
  <div className='flex flex-col gap-6 px-2'>
    <div className='grid gap-2'>
      <h2 className='text-lg font-semibold'>Task Management</h2>
      <p className='text-sm text-muted-foreground'>
        Here's a list of your tasks! Manage ongoing tasks or add new ones.
      </p>
    </div>
    <TasksTable />
  </div>
)
