import {
  Controller,
  ControllerProps,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { ReactNode, useRef } from 'react'
import { Button, Form, Select } from 'antd'
import Input from 'antd/es/input/Input'

const defaultForm = {
  name: 'Lovro',
  surname: 10,
  age: undefined,
}

type FormType = typeof defaultForm

const App = () => {
  const defaultValues = useRef<FormType>(defaultForm)
  const form = useForm<FormType>({ defaultValues: defaultValues.current })

  const onSubmit: SubmitHandler<FormType> = (e) => {
    console.log(e)
  }

  return (
    <FormProvider {...form}>
      <Form onFinish={form.handleSubmit(onSubmit)}>
        <FormInput
          control={form.control}
          name="name"
          inputClassName="max-w-10"
          rules={{ required: 'Required' }}
        />
        <FormSelect name="surname" />
        <Button htmlType="button" onClick={() => form.setValue('name', '')}>
          Clear
        </Button>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </FormProvider>
  )
}

export default App

type FormControllerProps<T extends FieldValues> = Omit<
  ControllerProps<T>,
  'render' | 'defaultValue' | 'shouldUnregister'
>

interface FormInputProps<T extends FieldValues> extends FormControllerProps<T> {
  label?: string
  helperText?: string
  containerClassName?: string
  inputClassName?: string
  children?: ReactNode
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  helperText,
  containerClassName,
  inputClassName,
  children,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.invalid ? 'error' : undefined}
          help={fieldState.error ? fieldState.error?.message : helperText}
        >
          <span className={containerClassName}>
            <Input
              {...field}
              value={field.value}
              className={inputClassName}
              aria-invalid={fieldState.invalid ? 'true' : 'false'}
              allowClear
            />
            {children}
          </span>
        </Form.Item>
      )}
    />
  )
}

const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  helperText,
  containerClassName,
  inputClassName,
  children,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.invalid ? 'error' : undefined}
          help={fieldState.error ? fieldState.error?.message : helperText}
        >
          <span className={containerClassName}>
            <Select
              {...field}
              value={field.value}
              className={inputClassName}
              aria-invalid={fieldState.invalid ? 'true' : 'false'}
              allowClear
            >
              <Select.Option value={10}>10</Select.Option>
              <Select.Option value={20}>20</Select.Option>
            </Select>
            {children}
          </span>
        </Form.Item>
      )}
    />
  )
}
