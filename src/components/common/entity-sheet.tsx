import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cloneElement, type ReactElement, type ReactNode, useState } from 'react'

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

interface EntitySheetProps<T = any> {
  trigger?: ReactNode
  createMode: Mode<T>
  updateMode?: Mode<T>
  onModeSuccess?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const EntitySheet = <T,>({
  trigger,
  createMode,
  updateMode,
  open,
  onOpenChange,
  onModeSuccess,
}: EntitySheetProps<T>) => {
  const isEditMode = !!updateMode?.data
  const [internalOpen, setInternalOpen] = useState(false)

  const isOpen = open ?? internalOpen
  const setIsOpen = onOpenChange ?? setInternalOpen

  const currentMode = isEditMode ? updateMode! : createMode

  const handleInjectedSuccess = () => {
    setIsOpen(false)
    onModeSuccess?.()
  }

  const injectedForm = cloneElement(currentMode.formComponent, {
    onSuccess: handleInjectedSuccess,
    data: currentMode.data,
  } as WithOnSuccess<T>)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent className='w-full sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>{currentMode.title}</SheetTitle>
          {currentMode.description && <SheetDescription>{currentMode.description}</SheetDescription>}
        </SheetHeader>
        {injectedForm}
      </SheetContent>
    </Sheet>
  )
}
