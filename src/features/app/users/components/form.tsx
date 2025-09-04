import type { ComponentPropsWithRef, ReactNode } from 'react'
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

import { SelectField } from '@/components/form/select-field'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type CreateUserSchema, roles, statuses } from '@/features/app/users/lib/schemas'

interface UserFormProps<T extends Partial<CreateUserSchema> & FieldValues>
  extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: ReactNode
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
}

export const UserForm = <T extends Partial<CreateUserSchema> & FieldValues>({
  form,
  onSubmit,
  children,
}: UserFormProps<T>) => (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex min-h-0 flex-1 flex-col'>
      <div className='flex flex-col gap-4 px-4 overflow-y-auto py-2 flex-1'>
        <FormField
          control={form.control}
          name={'name' as FieldPath<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoFocus
                  type='text'
                  placeholder='Enter name'
                  value={field.value ?? ''}
                  aria-invalid={!!fieldState.error}
                />
              </FormControl>
              <FormMessage className='text-xs text-right' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'email' as FieldPath<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='email'
                  placeholder='email@example.com'
                  aria-invalid={!!fieldState.error}
                />
              </FormControl>
              <FormMessage className='text-xs text-right' />
            </FormItem>
          )}
        />
        <SelectField
          form={form}
          name={'role' as FieldPath<T>}
          label='Role'
          placeholder='Select a role'
          options={roles} />
        <SelectField
          form={form}
          name={'status' as FieldPath<T>}
          label='Status'
          placeholder='Select a status'
          options={statuses} />
      </div>
      {children}
    </form>
  </Form>
)
