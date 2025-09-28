import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

interface FormSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: FieldPath<T>
  label?: string
  placeholder: string
  options: readonly string[]
}

export const FormSelect = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
}: FormSelectProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} value={field.value ?? ''}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue
                  placeholder={placeholder}
                  aria-invalid={!!fieldState.error} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map((item) => (
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
  )
}
