import {
  SpinnerGapIcon,
  XIcon
} from '@phosphor-icons/react'
import {
  AnimatePresence,
  motion
} from 'motion/react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection
} from '@/types/datatable'

export const ActionBar = <TData,>({
  table,
  visible: visibleProp,
  container: containerProp,
  children,
}: DataTableActionBar<TData>) => {
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
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
          className='fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-md border bg-background p-2 text-foreground shadow-sm'>
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    container,
  )
}

export const ActionBarAction = ({
  size = 'sm',
  tooltip,
  isPending,
  disabled,
  children,
}: DataTableActionBarAction) => {
  const trigger = (
    <Button
      variant='secondary'
      size={size}
      disabled={disabled || isPending}
      className={cn(
        'gap-1.5 border border-secondary bg-secondary/50 hover:bg-secondary/70 [&>svg]:size-3.5',
        size === 'icon' ? 'size-7' : 'h-7'
      )}>
      {isPending ? <SpinnerGapIcon className='animate-spin' /> : children}
    </Button>
  )

  if (!tooltip) return trigger

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent
        sideOffset={6}
        className='border bg-accent font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden'>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export const ActionBarSelection = <TData,>({ table }: DataTableActionBarSelection<TData>) => {
  const onClearSelection = useCallback(() => {
    table.toggleAllRowsSelected(false)
  }, [table])

  return (
    <div className='flex h-7 items-center rounded-md border bg-background pr-1 pl-2.5'>
      <span className='whitespace-nowrap text-xs'>
        {table.getFilteredSelectedRowModel().rows.length} selected
      </span>
      <Separator
        orientation='vertical'
        className='mx-2 data-[orientation=vertical]:h-4' />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='size-5'
            onClick={onClearSelection}>
            <XIcon className='size-3.5' />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10} className='flex items-center gap-2 border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden'>
          <p>Clear selection</p>
          <kbd className='select-none rounded border bg-background px-1.5 py-px font-mono font-normal text-[0.7rem] text-foreground shadow-xs'>
            <abbr title='Escape' className='no-underline'>Esc</abbr>
          </kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
