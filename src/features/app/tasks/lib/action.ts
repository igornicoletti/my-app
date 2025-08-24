import { type ActionFunctionArgs } from 'react-router-dom'
import { z } from 'zod'

import { createTaskSchema, updateTaskSchema, type TaskSchema } from '@/features/app/tasks/lib/schema'
import { createTask, deleteTask, deleteTasks, updateTask, updateTasks } from '@/features/app/tasks/lib/service'
import { json } from '@/lib/json'

export async function taskAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get('intent') as string

  try {
    switch (intent) {
      case 'createTask': {
        const data = Object.fromEntries(formData)
        const validatedData = createTaskSchema.parse(data)
        return json(await createTask(validatedData))
      }

      case 'updateTask': {
        const data = Object.fromEntries(formData)
        const validatedData = updateTaskSchema.parse(data)
        const id = formData.get('id') as string

        return json(await updateTask({ ...validatedData, id }))
      }

      case 'updateTasks': {
        const ids = formData.getAll('ids') as string[]
        const status = formData.get('status') as TaskSchema['status'] | null
        const priority = formData.get('priority') as TaskSchema['priority'] | null

        const payload: { ids: string[], status?: TaskSchema['status'], priority?: TaskSchema['priority'] } = { ids }
        if (status) payload.status = status
        if (priority) payload.priority = priority

        return json(await updateTasks(payload))
      }

      case 'deleteTask': {
        const id = formData.get('id') as string
        return json(await deleteTask({ id }))
      }

      case 'deleteTasks': {
        const ids = formData.getAll('ids') as string[]
        return json(await deleteTasks({ ids }))
      }

      default: {
        throw new Response(`Unsupported intent: ${intent}`, { status: 400 })
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({ error: error.flatten() }, { status: 400 })
    }
    const message = error instanceof Error ? error.message : "An unknown error occurred."
    return json({ error: message }, { status: 500 })
  }
}
