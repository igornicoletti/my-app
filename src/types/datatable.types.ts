import type { Column, Table } from '@tanstack/react-table'
import type { ReactNode } from 'react'

export type TColumnMeta = {
  label: string
  variant: 'text' | 'number' | 'select' | 'multiSelect' | 'date'
  placeholder?: string
  multiple?: boolean
  options?: TColumnOption[]
}

export type TColumnHeaderProps<TData> = {
  column: Column<TData, unknown>
  title: string
}

export type TDataTableProps<TData> = {
  table: Table<TData>
  children?: ReactNode
  actionBar?: ReactNode
}

export type TPaginationControlsProps<TData> = {
  table: Table<TData>
  pageSizeOptions?: number[]
}

export type TToolbarProps<TData> = {
  table: Table<TData>
  children?: ReactNode
}

export type TToolbarVariantsProps<TData> = {
  column: Column<TData, unknown>
}

export type TColumnOption = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export type TDateFilterProps<TData> = {
  column: Column<TData, unknown>
  title: string
  multiple?: boolean
}

export type TFacetedFilterProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: string
  options: TColumnOption[]
}

export type THideableViewProps<TData> = {
  table: Table<TData>
}

export type TViewOptionsProps<TData> = {
  table: Table<TData>
}

export type TRowActionsProps = {
  actions: Array<
    | {
      type: 'item'
      label: string
      icon?: React.ComponentType<{ className?: string }>
      onSelect: () => void
      disabled?: boolean
    }
    | {
      type: 'radio-group'
      label: string
      icon?: React.ComponentType<{ className?: string }>
      value: string
      onChange: (value: string) => void
      options: { label: string; value: string }[]
      disabled?: boolean
    }
  >
}
