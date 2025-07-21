import { useLoaderData } from 'react-router-dom'

import {
  columns,
  DataTable,
} from '@/components'
import type { UserSchema } from '@/schemas'

export const Users = () => {
  const data = useLoaderData() as UserSchema[]

  return (
    <DataTable data={data} columns={columns} />
  )
}
