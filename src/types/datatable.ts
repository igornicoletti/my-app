import type {
  Column,
  ColumnSort,
  Row,
  RowData,
  Table,
  Table as TanstackTable
} from '@tanstack/react-table'
import type { motion } from 'motion/react'
import type { ComponentProps, ElementType, ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import type { DataTableConfig } from '@/config/datatable'
import type { FilterItemSchema } from '@/lib/parsers'

declare module '@tanstack/react-table' {
  // biome-ignore lint/correctness/noUnusedVariables: TValue is used in the ColumnMeta interface
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string
    placeholder?: string
    variant?: FilterVariant
    options?: Option[]
    range?: [number, number]
    unit?: string
    icon?: ElementType
  }
}

export interface Option {
  label: string
  value: string | number
  count?: number
  icon?: ElementType
}

export type FilterOperator = DataTableConfig['operators'][number]

export type FilterVariant = DataTableConfig['filterVariants'][number]

export type JoinOperator = DataTableConfig['joinOperators'][number]

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, 'id'> {
  id: Extract<keyof TData, string>
}

export interface ExtendedColumnFilter<TData> extends FilterItemSchema {
  id: Extract<keyof TData, string>
}

export interface DataTableRowAction<TData> {
  row: Row<TData>
  variant: 'update' | 'delete' | 'detail'
}

export interface DataTableProps<TData> extends ComponentProps<'div'> {
  table: TanstackTable<TData>
  actionBar?: ReactNode
}

export interface DataTableDateFilter<TData> {
  column: Column<TData, unknown>
  title?: string
  multiple?: boolean
}

export interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: Option[]
  multiple?: boolean
}

export interface DataTablePagination<TData> extends ComponentProps<'div'> {
  table: Table<TData>
  pageSizeOptions?: number[]
}

export interface DataTableToolbar<TData> extends ComponentProps<'div'> {
  table: Table<TData>
}

export interface DataTableViewOptions<TData> {
  table: Table<TData>
}

export interface DataTableActionBarSelection<TData> {
  table: Table<TData>
}

export interface DataTableActionBar<TData> extends ComponentProps<typeof motion.div> {
  table: Table<TData>
  visible?: boolean
  container?: HTMLElement | null
}

export interface DataTableActionBarAction extends ComponentProps<typeof Button> {
  tooltip?: string
  isPending?: boolean
}
