import type { ReactNode } from 'react'
import type { Control, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

import { Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/components'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { tasks } from '@/features/app/tasks/api'

interface FormSelectFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder: string
  options: readonly string[]
}

const FormSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: FormSelectFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className='w-full capitalize'>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              {options.map((item) => (
                <SelectItem key={item} value={item} className='capitalize'>
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
)

interface TaskFormProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: ReactNode
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
}

export const TasksForm = <T extends FieldValues>({ form, onSubmit, children }: TaskFormProps<T>) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className='flex h-full flex-col'>
      <div className='flex-1 space-y-4 px-4 py-2'>
        <FormField
          control={form.control}
          name={'title' as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea placeholder='Do a kickflip' className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSelectField
          control={form.control}
          name={'label' as FieldPath<T>}
          label='Label'
          placeholder='Select a label'
          options={tasks.label.enumValues}
        />
        <FormSelectField
          control={form.control}
          name={'status' as FieldPath<T>}
          label='Status'
          placeholder='Select a status'
          options={tasks.status.enumValues}
        />
        <FormSelectField
          control={form.control}
          name={'priority' as FieldPath<T>}
          label='Priority'
          placeholder='Select a priority'
          options={tasks.priority.enumValues}
        />
        <FormField
          control={form.control}
          name={'estimatedHours' as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Hours</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Enter estimated hours'
                  min='0'
                  {...field}
                  onChange={(event) => field.onChange(event.target.valueAsNumber || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {children}
    </form>
  </Form>
)
