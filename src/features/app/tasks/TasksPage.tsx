import { TasksTable } from '@/features/app/tasks/components/TasksTable'

export const TasksPage = () => (
  <div className='flex flex-col gap-6 px-2'>
    <div className='grid gap-2'>
      <h2 className='text-xl font-bold'>Tasks Table</h2>
      <p className='text-sm text-muted-foreground'>
        Here's a list of your tasks for this month!
      </p>
    </div>
    <TasksTable />
  </div>
)
