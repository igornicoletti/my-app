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
import { ScrollArea } from '@/components/ui/scroll-area'
import { labels, priorities, statuses } from '@/features/app/tasks/lib/schema'

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
    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col flex-1'>
      <ScrollArea className='flex-1 px-4 py-2'>
        <div className='grid auto-rows-min gap-4'>
          <FormField
            control={form.control}
            name={'title' as FieldPath<T>}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
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
                    <SelectTrigger className='w-full capitalize'>
                      <SelectValue
                        placeholder='Select a label'
                        aria-invalid={!!fieldState.error} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {labels.map((item) => (
                        <SelectItem key={item} value={item} className='capitalize'>
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
                <Select onValueChange={field.onChange} value={field.value ?? ''}>
                  <FormControl>
                    <SelectTrigger className='w-full capitalize'>
                      <SelectValue
                        placeholder='Select a status'
                        aria-invalid={!!fieldState.error} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {statuses.map((item) => (
                        <SelectItem key={item} value={item} className='capitalize'>
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
                    <SelectTrigger className='w-full capitalize'>
                      <SelectValue
                        placeholder='Select a priority'
                        aria-invalid={!!fieldState.error} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {priorities.map((item) => (
                        <SelectItem key={item} value={item} className='capitalize'>
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