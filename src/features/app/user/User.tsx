import { useLoaderData } from 'react-router-dom'

import { DataTable } from '@/components'
import type { UserSchema } from '@/features/app/user/data'
import { columns } from '@/features/app/user/data'

export const User = () => {
  const data = useLoaderData() as UserSchema[]

  return (
    <DataTable data={data} columns={columns} />
  )
}
