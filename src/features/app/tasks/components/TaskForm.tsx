import type { ComponentPropsWithRef, ReactNode } from 'react'
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { labels, priorities, statuses } from '@/features/app/tasks/lib/types'

interface TaskFormProps<T extends FieldValues> extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: ReactNode
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
}

export const TaskForm = <T extends FieldValues>({
  form,
  onSubmit,
  children
}: TaskFormProps<T>) => (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex min-h-0 flex-1 flex-col gap-4'>
      <div className='flex flex-col gap-4 px-4 overflow-auto'>
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
                  aria-invalid={!!fieldState.error} />
              </FormControl>
              <FormMessage className='text-xs text-right' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'label' as FieldPath<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ''}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a label' aria-invalid={!!fieldState.error} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {labels.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage className='text-xs text-right' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'status' as FieldPath<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ''}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a status' aria-invalid={!!fieldState.error} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {statuses.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage className='text-xs text-right' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'priority' as FieldPath<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ''}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a priority' aria-invalid={!!fieldState.error} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {priorities.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage className='text-xs text-right' />
            </FormItem>
          )}
        />
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
                  onChange={(event) => field.onChange(event.target.valueAsNumber)}
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
