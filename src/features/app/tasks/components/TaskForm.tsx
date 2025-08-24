import type { ReactNode } from 'react'
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
import { taskSchema } from '@/features/app/tasks/lib/schema'

interface TaskFormProps<T extends FieldValues> extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
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
      className='flex flex-col gap-4'>
      <FormField
        control={form.control}
        name={'title' as FieldPath<T>}
        render={({ field }) => (
          <FormItem className='px-4'>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Textarea
                placeholder='Do a kickflip'
                className='resize-none'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={'label' as FieldPath<T>}
        render={({ field }) => (
          <FormItem className='px-4'>
            <FormLabel>Label</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className='capitalize w-full'>
                  <SelectValue placeholder='Select a label' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {taskSchema.shape.label.options.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className='capitalize'>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={'status' as FieldPath<T>}
        render={({ field }) => (
          <FormItem className='px-4'>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className='capitalize w-full'>
                  <SelectValue placeholder='Select a status' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {taskSchema.shape.status.options.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className='capitalize'>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={'priority' as FieldPath<T>}
        render={({ field }) => (
          <FormItem className='px-4'>
            <FormLabel>Priority</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className='capitalize w-full'>
                  <SelectValue placeholder='Select a priority' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {taskSchema.shape.priority.options.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      className='capitalize'>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={'estimatedHours' as FieldPath<T>}
        render={({ field }) => (
          <FormItem className='px-4'>
            <FormLabel>Estimated Hours</FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='Enter estimated hours'
                step='0.5'
                min='0'
                {...field}
                onChange={(event) => field.onChange(event.target.valueAsNumber)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {children}
    </form>
  </Form>
)
