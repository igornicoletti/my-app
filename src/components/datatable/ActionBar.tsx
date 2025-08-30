import { SpinnerGapIcon, XIcon } from '@phosphor-icons/react'
import type { Table } from '@tanstack/react-table'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useState, type ComponentProps } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface ActionBarProps<TData> extends ComponentProps<typeof motion.div> {
  table: Table<TData>
  visible?: boolean
  container?: Element | DocumentFragment | null
}

export const ActionBar = <TData,>({
  table,
  visible: visibleProp,
  container: containerProp,
  children,
  className,
  ...props
}: ActionBarProps<TData>) => {
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') table.toggleAllRowsSelected(false)
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
          className={cn(
            'fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-md border bg-background p-2 text-foreground shadow-sm',
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

interface ActionBarActionProps extends ComponentProps<typeof Button> {
  tooltip?: string
  isPending?: boolean
}

export const ActionBarAction = ({
  size = 'sm',
  tooltip,
  isPending,
  disabled,
  className,
  children,
  ...props
}: ActionBarActionProps) => {
  const trigger = (
    <Button
      variant='secondary'
      size={size}
      className={cn(
        size === 'icon' ? 'size-7' : 'h-7',
        className,
      )}
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

interface ActionBarSelectionProps<TData> {
  table: Table<TData>
}

export const ActionBarSelection = <TData,>({
  table
}: ActionBarSelectionProps<TData>) => {
  const onClearSelection = useCallback(() => {
    table.toggleAllRowsSelected(false)
  }, [table])

  return (
    <div className='flex h-8 items-center rounded-md border pr-1 pl-2.5'>
      <span className='whitespace-nowrap text-xs'>
        {table.getFilteredSelectedRowModel().rows.length} selected
      </span>
      <Separator orientation='vertical' className='mr-1 ml-2 data-[orientation=vertical]:h-4' />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='size-5'
            onClick={onClearSelection}>
            <XIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Clear selection
          <kbd className='ml-2 select-none rounded border bg-primary-foreground/25 px-1 py-px text-[0.675rem] shadow-xs'>
            <abbr title='Escape' className='no-underline'>
              Esc
            </abbr>
          </kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
