import { FormSelect } from '@/components/form/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type CreateTaskSchema, labelList, priorityList, statusList } from '@/features/app/task/lib/schemas'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

interface TaskFormProps<T extends Partial<CreateTaskSchema> & FieldValues>
  extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: ReactNode
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
}

export const TaskForm = <T extends Partial<CreateTaskSchema> & FieldValues>({
  form,
  onSubmit,
  children,
}: TaskFormProps<T>) => (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex min-h-0 flex-1 flex-col'>
      <div className='flex flex-col gap-4 px-4 overflow-y-auto py-2 flex-1'>
        <FormField
          control={form.control}
          name={'title' as FieldPath<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  autoFocus
                  placeholder='Do a kickflip'
                  className='resize-none'
                  aria-invalid={!!fieldState.error}
                />
              </FormControl>
              <FormMessage className='text-xs text-right' />
            </FormItem>
          )}
        />
        <FormSelect
          form={form}
          name={'label' as FieldPath<T>}
          label='Label'
          placeholder='Select a label'
          options={labelList} />
        <FormSelect
          form={form}
          name={'status' as FieldPath<T>}
          label='Status'
          placeholder='Select a status'
          options={statusList} />
        <FormSelect
          form={form}
          name={'priority' as FieldPath<T>}
          label='Priority'
          placeholder='Select a priority'
          options={priorityList} />
        <FormField
          control={form.control}
          name={'estimatedHours' as FieldPath<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Estimated Hours</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='number'
                  placeholder='Enter estimated hours'
                  step='0.5'
                  min='0'
                  value={field.value ?? ''}
                  onChange={(event) => field.onChange(event.target.valueAsNumber || 0)}
                  aria-invalid={!!fieldState.error} />
              </FormControl>
              <FormMessage className='text-xs text-right' />
            </FormItem>
          )}
        />
      </div>
      {children}
    </form>
  </Form>
)
