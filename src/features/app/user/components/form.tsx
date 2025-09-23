import { FormSelect } from '@/components/form/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type CreateUserSchema, roleList, statusList } from '@/features/app/user/lib/schemas'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

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
                  aria-invalid={!!fieldState.error} />
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
                  value={field.value ?? ''}
                  aria-invalid={!!fieldState.error} />
              </FormControl>
              <FormMessage className='text-xs text-right' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'phone' as FieldPath<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='tel'
                  placeholder='+99 (99) 9 9999 9999'
                  value={field.value ?? ''}
                  aria-invalid={!!fieldState.error}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let val = e.target.value.replace(/\D/g, '')
                    const country = val.slice(0, 2)
                    const area = val.slice(2, 4)
                    const one = val.slice(4, 5)
                    const first = val.slice(5, 9)
                    const second = val.slice(9, 13)

                    let formatted = ''
                    if (country) formatted += '+' + country
                    if (area) formatted += ' (' + area + ')'
                    if (one) formatted += ' ' + one
                    if (first) formatted += ' ' + first
                    if (second) formatted += ' ' + second

                    field.onChange(formatted)
                  }}
                />
              </FormControl>
              <FormMessage className='text-xs text-right' />
            </FormItem>
          )}
        />
        <FormSelect
          form={form}
          name={'status' as FieldPath<T>}
          label='Status'
          placeholder='Select a status'
          options={statusList} />
        <FormSelect
          form={form}
          name={'role' as FieldPath<T>}
          label='Role'
          placeholder='Select a role'
          options={roleList} />
      </div>
      {children}
    </form>
  </Form>
)
