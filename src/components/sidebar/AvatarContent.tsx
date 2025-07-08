import { Avatar, AvatarFallback, AvatarImage } from '@/components'

export type AvatarValues = {
  title: string
  description?: string
  avatar?: string
}

export const AvatarContent = ({ title, description, avatar }: AvatarValues) => (
  <div className='flex items-center gap-2'>
    <Avatar className='rounded-sm'>
      <AvatarImage src={avatar} alt={title} />
      <AvatarFallback className='rounded-md text-white bg-sidebar-primary'>
        {title[0]}
      </AvatarFallback>
    </Avatar>
    <div className='grid flex-1 text-left text-sm leading-tight'>
      <span className='truncate font-medium'>{title}</span>
      <span className='truncate text-xs text-muted-foreground'>
        {description}
      </span>
    </div>
  </div>
)
