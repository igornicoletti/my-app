import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { type ReactElement, type ReactNode, useState } from 'react'

type WithOnSuccess<T = any> = {
  onSuccess?: () => void
  data?: T | null
}

type Mode<T = any> = {
  data?: T | null
  title: string
  description?: string
  formComponent: ReactElement<WithOnSuccess<T>>
}

interface CommonEntityProps<T = any> {
  trigger?: ReactNode
  createMode: Omit<Mode<T>, 'formComponent'>
  updateMode?: Omit<Mode<T>, 'formComponent'>
  onModeSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: (props: { onSuccess: () => void; data: T | null | undefined }) => ReactNode
}

export const CommonEntity = <T,>({
  trigger,
  createMode,
  updateMode,
  children,
  open,
  onOpenChange,
  onModeSuccess,
}: CommonEntityProps<T>) => {
  const isEditMode = !!updateMode?.data
  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open ?? internalOpen
  const setIsOpen = onOpenChange ?? setInternalOpen
  const currentMode = isEditMode ? updateMode! : createMode

  const handleInjectedSuccess = () => {
    setIsOpen(false)
    onModeSuccess?.()
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>{currentMode.title}</SheetTitle>
          {currentMode.description && (
            <SheetDescription>
              {currentMode.description}
            </SheetDescription>
          )}
        </SheetHeader>
        {children({
          onSuccess: handleInjectedSuccess,
          data: currentMode.data
        })}
      </SheetContent>
    </Sheet>
  )
}
