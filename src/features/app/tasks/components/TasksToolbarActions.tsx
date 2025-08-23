import type { Table } from "@tanstack/react-table"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CreateTasks } from '@/features/app/tasks/components/CreateTasks'
import { DeleteTasks } from '@/features/app/tasks/components/DeleteTasks'
import type { TaskSchema } from '@/features/app/tasks/lib/schema'
import { exportTableToCSV } from "@/lib/export"

interface TasksTableToolbarActionsProps {
  table: Table<TaskSchema>
}

export function TasksTableToolbarActions({
  table,
}: TasksTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasks
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <CreateTasks />
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "tasks",
            excludeColumns: ["select", "actions"],
          })
        }>
        <Download />
        Export
      </Button>

    </div>
  )
}
