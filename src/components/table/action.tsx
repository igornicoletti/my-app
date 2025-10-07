import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/libs/utils'
import { SpinnerGapIcon, XIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface TableActionProps<TData>
  extends React.ComponentProps<typeof motion.div> {
  table: Table<TData>
  visible?: boolean
  container?: Element | DocumentFragment | null
}

const TableAction = <TData,>({
  table,
  visible: visibleProp,
  container: containerProp,
  children,
  className,
  ...props
}: TableActionProps<TData>) => {
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        table.toggleAllRowsSelected(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [table])

  const container = containerProp ?? (mounted ? globalThis.document?.body : null)

  if (!container) return null

  const visible = visibleProp ?? table.getFilteredSelectedRowModel().rows.length > 0

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          role='toolbar'
          aria-orientation='horizontal'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={cn('fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-md border bg-background p-2 text-foreground shadow-sm', className)}
          {...props}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    container,
  )
}

interface TableActionButtonProps
  extends React.ComponentProps<typeof Button> {
  tooltip?: string
  isPending?: boolean
}

const TableActionButton = ({
  size = 'sm',
  tooltip,
  isPending,
  disabled,
  className,
  children,
  ...props
}: TableActionButtonProps) => {
  const trigger = (
    <Button
      variant='secondary'
      size={size}
      className={cn('gap-1.5 border border-border bg-popover [&>svg]:size-3.5', size === 'icon' ? 'size-7' : 'h-7', className)}
      disabled={disabled || isPending}
      {...props}>
      {isPending ? <SpinnerGapIcon className='animate-spin' /> : children}
    </Button>
  )

  if (!tooltip) return trigger

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

interface TableActionSelectionProps<TData> {
  table: Table<TData>
}

const TableActionSelection = <TData,>({ table }: TableActionSelectionProps<TData>) => {
  const onClearSelection = useCallback(() => {
    table.toggleAllRowsSelected(false)
  }, [table])

  return (
    <div className='flex h-7 items-center rounded-md border pr-1 pl-2.5'>
      <span className='whitespace-nowrap text-xs'>
        {table.getFilteredSelectedRowModel().rows.length} selected
      </span>
      <Separator orientation='vertical' className='mr-1 ml-2 data-[orientation=vertical]:h-4' />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={onClearSelection} variant='ghost' size='icon' className='size-5'>
            <XIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10} className='flex items-center gap-2'>
          Clear Selection <Kbd>Esc</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

export { TableAction, TableActionButton, TableActionSelection }
