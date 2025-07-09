import { useState } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'

import { Button, FormControl, FormField, FormItem, FormMessage, Input } from '@/components'

interface FieldControlValues<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  type: string
  autoComplete?: string
  autoFocus?: boolean
  disabled?: boolean
  placeholder?: string
}

export const FieldControl = <T extends FieldValues>({ control, name, type, autoComplete, autoFocus, disabled, placeholder }: FieldControlValues<T>) => {
  const [visible, setVisible] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <FormField name={name} control={control} render={({ field, fieldState }) => (
      <FormItem>
        <FormControl>
          <div className='relative'>
            <Input
              {...field}
              type={inputType}
              disabled={disabled}
              placeholder={placeholder}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              aria-invalid={!!fieldState.error} />
            {isPassword && (
              <Button onClick={() => setVisible((prev) => !prev)}
                aria-label={visible ? 'Hide password' : 'Show password'}
                size='icon' type='button' variant='ghost' className='absolute top-0 right-0'>
                {visible ? <EyeSlashIcon /> : <EyeIcon />}
              </Button>
            )}
          </div>
        </FormControl>
        <FormMessage className='text-xs text-right font-medium' />
      </FormItem>
    )} />
  )
}
