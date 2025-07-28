import { useCallback, useLayoutEffect, useState, type ReactNode } from 'react'
import ReactDOM from 'react-dom'

import { SpinnerGapIcon, XIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'

import {
  Button,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'

interface ActionBarProps<TData> {
  table: Table<TData>
  visible?: boolean
  container?: Element | DocumentFragment | null
  children: ReactNode
}

export const ActionBar = <TData,>({
  table, visible: visibleProp, container: containerProp, children
}: ActionBarProps<TData>) => {
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  const container = containerProp ?? (mounted ? document?.body : null)
  const visible = visibleProp ?? table.getFilteredSelectedRowModel().rows.length > 0

  if (!container || !visible) return null

  return ReactDOM.createPortal(
    <div role='toolbar' aria-orientation='horizontal' className='fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit flex-wrap items-center justify-center gap-2'>
      {children}
    </div>,
    container
  )
}

interface ActionBarActionProps {
  tooltip?: string
  isPending?: boolean
  disabled?: boolean
  onClick?: () => void
  children: ReactNode
}

export const ActionBarAction = ({
  tooltip, isPending, disabled, onClick, children
}: ActionBarActionProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button onClick={onClick} disabled={disabled || isPending} variant='secondary' size='sm'>
        {isPending ? <SpinnerGapIcon className='animate-spin' /> : children}
      </Button>
    </TooltipTrigger>
    {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
  </Tooltip>
)

export const ActionBarSelection = <TData,>({ table }: { table: Table<TData> }) => {
  const onClearSelection = useCallback(() => {
    table.toggleAllRowsSelected(false)
  }, [table])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={onClearSelection} variant='secondary' size='sm'>
          <span className='whitespace-nowrap text-xs'>
            {table.getFilteredSelectedRowModel().rows.length} selected
          </span>
          <Separator orientation='vertical' className='data-[orientation=vertical]:h-4' />
          <XIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Clear selection</TooltipContent>
    </Tooltip>
  )
}
