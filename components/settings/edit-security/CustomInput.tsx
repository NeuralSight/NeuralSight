import { useState } from 'react'
import { Control, FieldError, useController } from 'react-hook-form'
import { PasswordUpdate } from '../../../typings'

type Props = {
  label: string
  type: 'text' | 'tel' | 'password' | 'number' | 'email'
  icon?: React.ReactNode | undefined
  control?: Control<PasswordUpdate>
  fieldName: 'oldpass' | 'newpass' | 'confirmpass'
  rules?: object
  spaceY?: '1' | '2' | '3' | '4' | '5' | '6'
  placeholder?: string | undefined
  max?: number
  min?: number
  defaultValue?: string | undefined
  className?: string
  error?: FieldError
}

const CustomInput = (props: Props) => {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController<PasswordUpdate>({
    name: props.fieldName,
    control: props.control,
    rules: props.rules,
    defaultValue: props.defaultValue,
  })

  const [UIValue, setUIValue] = useState(value)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const handleFocus = () => {
    setIsFocused(true)
  }
  const handleBlur = () => {
    setIsFocused(false)
    onBlur
  }
  return (
    <div className={` flex flex-col space-y-${props.spaceY} w-auto px-2`}>
      <label
        htmlFor={props.label}
        className='text-sm lg:text-base text-slate-50 tracking-wide'
      >
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.label}
        ref={ref}
        value={UIValue}
        onChange={(event) => {
          onChange(event.target.value) // data send back to hook form
          setUIValue(event.target.value) // UI state
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        max={props.max}
        min={props.min}
        name={props.label}
        placeholder={props.placeholder}
        className={`${
          props.className
        } appearance-none outline-none font-medium w-full h-fit py-3 rounded-[10px] border-2 border-zinc-300 placeholder:placeholder-gray-500/50 text-slate-600 px-4 transition-all duration-200 ease-in-out ${
          isFocused
            ? ' bg-primary-lightest outline-2 outline-primary-light'
            : ' hover:outline-1 hover:outline-secondary-dark bg-gray-100'
        }`}
      />
      {props.error && (
        <p className='text-sm text-red-500 font-semibold'>
          {props.error.message}
        </p>
      )}
    </div>
  )
}

export default CustomInput
