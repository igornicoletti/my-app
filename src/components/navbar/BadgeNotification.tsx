import { BellIcon } from '@phosphor-icons/react'

import { Button } from '@/components'

export const BadgeNotification = ({ ...props }) => (
  <div className='flex items-center gap-2'>
    <div className='relative'>
      <Button size='icon' {...props}>
        <BellIcon />
      </Button>
      <span className='absolute top-0 right-0 px-1 min-w-4 translate-x-1/2 -translate-y-1/2 origin-center flex items-center justify-center rounded-full text-xs bg-destructive text-destructive-foreground'>
        2
      </span>
    </div>
  </div>
)