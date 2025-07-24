import { WarningCircleIcon } from '@phosphor-icons/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components'
import { useAlert } from '@/contexts'

export const ConfirmDialog = () => {
  const { isOpen, onOpenChange, options, onConfirm, onCancel } = useAlert()

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <WarningCircleIcon />
        <AlertDialogHeader>
          <AlertDialogTitle>
            {options?.title || 'Are you absolutely sure?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {options?.description || 'This action cannot be undone. It will permanently remove the data from our servers'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {options?.cancelText || 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {options?.confirmText || 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
