import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import type {
  Control,
  FieldPath,
  FieldValues
} from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface FieldControlProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  type: string
  autoComplete?: string
  autoFocus?: boolean
  disabled?: boolean
  placeholder?: string
}

export const FieldControl = <T extends FieldValues>({
  autoComplete,
  autoFocus,
  control,
  disabled,
  name,
  placeholder,
  type
}: FieldControlProps<T>) => {
  const [visible, setVisible] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <div className='relative'>
              <Input
                {...field}
                type={inputType}
                disabled={disabled}
                autoFocus={autoFocus}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={!!fieldState.error} />
              {isPassword && (
                <Button
                  aria-label='Password visibility'
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='absolute top-0 right-0'
                  onClick={() => setVisible((prev) => !prev)}>
                  {visible ? <EyeSlashIcon /> : <EyeIcon />}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage className='text-xs text-right' />
        </FormItem>
      )}
    />
  )
}
