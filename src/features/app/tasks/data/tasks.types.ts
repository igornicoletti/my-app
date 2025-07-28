export type TaskProps = {
  id: string
  code: string
  title: string
  status: 'todo' | 'in-progress' | 'done' | 'canceled'
  priority: 'low' | 'medium' | 'high'
  label?: string
  createdAt: string
}

export type FilterVariant =
  | 'text'
  | 'number'
  | 'select'
  | 'multiSelect'

export interface ColumnOption {
  label: string
  value: string
  count?: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface ColumnMeta {
  variant?: FilterVariant
  label?: string
  placeholder?: string
  options?: ColumnOption[]
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}
