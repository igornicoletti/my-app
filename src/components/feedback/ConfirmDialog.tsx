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
  const { isOpen, onOpenChange, options } = useAlert()

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {options?.title || 'Are you absolutely sure?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {options?.description || 'This action cannot be undone. It will permanently remove the data from our servers'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={options?.onCancel}>
            {options?.cancelText || 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={options?.onConfirm} >
            {options?.confirmText || 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
