import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { useState } from 'react'

interface CommonConfirmProps extends Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'> {
  trigger?: ReactNode
  onConfirm: () => void | Promise<void>
  title?: ReactNode
  description?: ReactNode
  confirmText?: ReactNode
  cancelText?: ReactNode
}

export const CommonConfirm = ({
  trigger,
  open,
  onOpenChange,
  onConfirm,
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Continue',
  cancelText = 'Cancel',
  ...props
}: CommonConfirmProps) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [internalOpen, setInternalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const Component = isDesktop ? Dialog : Drawer
  const TriggerComp = isDesktop ? DialogTrigger : DrawerTrigger
  const Content = isDesktop ? DialogContent : DrawerContent
  const Header = isDesktop ? DialogHeader : DrawerHeader
  const TitleComp = isDesktop ? DialogTitle : DrawerTitle
  const DescriptionComp = isDesktop ? DialogDescription : DrawerDescription
  const Footer = isDesktop ? DialogFooter : DrawerFooter
  const Close = isDesktop ? DialogClose : DrawerClose

  const isOpen = open ?? internalOpen
  const setIsOpen = onOpenChange ?? setInternalOpen

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      setIsOpen(false)
    } catch (error) {
      console.error('Confirmation action failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Component open={isOpen} onOpenChange={setIsOpen} {...props}>
      {trigger && <TriggerComp asChild>{trigger}</TriggerComp>}
      <Content autoFocus>
        <Header>
          <TitleComp>{title}</TitleComp>
          <DescriptionComp>{description}</DescriptionComp>
        </Header>
        <Footer>
          <Close asChild>
            <Button type='button' variant='outline' disabled={isLoading}>{cancelText}</Button>
          </Close>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? <SpinnerGapIcon className='animate-spin' /> : confirmText}
          </Button>
        </Footer>
      </Content>
    </Component>
  )
}
