import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { useState } from 'react'

interface CommonConfirmProps extends Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'> {
  trigger?: ReactNode
  onConfirm: () => void
}

export const CommonConfirm = ({
  trigger,
  open,
  onOpenChange,
  onConfirm,
  ...props
}: CommonConfirmProps) => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [internalOpen, setInternalOpen] = useState(false)

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

  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  return (
    <Component open={isOpen} onOpenChange={setIsOpen} {...props}>
      {trigger && <TriggerComp asChild>{trigger}</TriggerComp>}
      <Content>
        <Header>
          <TitleComp>Are you absolutely sure?</TitleComp>
          <DescriptionComp>This action cannot be undone.</DescriptionComp>
        </Header>
        <Footer>
          <Close asChild>
            <Button type='button' variant='outline'>Cancel</Button>
          </Close>
          <Button onClick={handleConfirm}>Continue</Button>
        </Footer>
      </Content>
    </Component>
  )
}
