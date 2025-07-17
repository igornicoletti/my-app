import { useLoaderData } from 'react-router-dom'

import {
  columns,
  DataTable,
  type Task
} from '@/components'

export const Users = () => {
  const loaderData = useLoaderData() as Task[]

  return (
    <DataTable columns={columns} data={loaderData} />
  )
}
