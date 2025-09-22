import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/libs/utils'
import { SpinnerGapIcon, XIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState, type ComponentProps } from 'react'
import { createPortal } from 'react-dom'

interface ActionBarProps<TData> extends ComponentProps<typeof motion.div> {
  table: Table<TData>
  container?: Element | DocumentFragment | null
}

export const ActionBar = <TData,>({
  table,
  container: containerProp,
  children,
  className,
  ...props
}: ActionBarProps<TData>) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        table.toggleAllRowsSelected(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [table])

  const isVisible = table.getFilteredSelectedRowModel().rows.length > 0
  const container = containerProp ?? (isMounted ? document.body : null)

  if (!container) {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role='toolbar'
          aria-label='Action Bar'
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={cn(
            'fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit items-center gap-2 rounded-lg border bg-background p-2 shadow-lg',
            className,
          )}
          {...props}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    container,
  )
}

interface ActionProps extends ComponentProps<typeof Button> {
  tooltip?: string
  isPending?: boolean
}

export const ActionBarAction = ({
  tooltip,
  isPending,
  disabled,
  className,
  children,
  ...props
}: ActionProps) => {
  const actionButton = (
    <Button
      variant='secondary'
      size='sm'
      className={cn('h-8', className)}
      disabled={disabled || isPending}
      {...props}>
      {isPending ? <SpinnerGapIcon className='animate-spin' /> : children}
    </Button>
  )

  if (!tooltip) {
    return actionButton
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{actionButton}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

interface SelectionProps<TData> {
  table: Table<TData>
}

export const ActionBarSelection = <TData,>({ table }: SelectionProps<TData>) => {
  const onClearSelection = useCallback(() => {
    table.toggleAllRowsSelected(false)
  }, [table])

  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length

  return (
    <div className='flex h-8 items-center rounded-md border border-dashed pr-1 pl-2.5'>
      <span className='text-sm font-medium'>{selectedRowCount} selected</span>
      <Separator orientation='vertical' className='ml-2 data-[orientation=vertical]:h-4' />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button aria-label='Clear selection' variant='ghost' size='icon' className='size-6' onClick={onClearSelection}>
            <XIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Clear selection</TooltipContent>
      </Tooltip>
    </div>
  )
}
