import { useLoaderData } from 'react-router-dom'

import {
  columns,
  DataTable,
  type Task
} from '@/components'

export const Users = () => {
  const data = useLoaderData() as Task[]

  return (
    <DataTable data={data} columns={columns} />
  )
}
