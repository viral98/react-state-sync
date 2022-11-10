import { TextField } from '@mui/material'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

type FormInputProps = {
  name: string
  label: string
  required?: boolean
  fullWidth?: boolean
  register?: (value: string) => object
  margin?: 'dense' | 'normal' | 'none'
  type?: React.InputHTMLAttributes<unknown>['type']
  disabled?: boolean
  defaultValue?: string
}
export function FormInput({
  name,
  required,
  fullWidth,
  label,
  margin,
  register,
  type,
  disabled,
  defaultValue
}: FormInputProps): JSX.Element {
  const { control } = useFormContext()

  return (
    <React.Fragment>
      <Controller
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, ref, value } }) => (
          <TextField
            required={required}
            {...(register && register(name))}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            fullWidth={fullWidth}
            label={label}
            margin={margin}
            value={value}
            type={type}
            disabled={disabled}
            defaultValue={defaultValue}
            multiline={type === 'textarea'}
            rows={type === 'textarea' ? 4 : 1}
          />
        )}
        name={name}
        control={control}
        rules={{ required: required }}
      />
    </React.Fragment>
  )
}

export default FormInput
