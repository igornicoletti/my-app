import { columns, DataTable, type User } from '@/components'

const users: User[] = [
  {
    id: "usr_1",
    name: "João Silva",
    email: "joao.silva@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "usr_2",
    name: "Maria Oliveira",
    email: "maria.o@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: "usr_3",
    name: "Carlos Pereira",
    email: "carlos.p@example.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: "usr_4",
    name: "Ana Costa",
    email: "ana.costa@example.com",
    role: "Editor",
    status: "Pending",
  },
]

export const Users = () => {
  return (
    <div>
      <DataTable columns={columns} data={users} />
    </div>
  )
}
