import { useState } from 'react'

type Props = {
  label: string
  type: 'text' | 'tel' | 'password' | 'number' | 'email'
  icon?: React.ReactNode | undefined
  register?: object | undefined
  spaceY?: '1' | '2' | '3' | '4' | '5' | '6'
  placeholder?: string | undefined
}

const CustomInput = (props: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const handleFocus = () => {
    setIsFocused(true)
  }
  const handleBlur = () => {
    setIsFocused(false)
  }
  return (
    <div className={`flex flex-col space-y-${props.spaceY} w-auto px-2`}>
      <label
        htmlFor={props.label}
        className='text-sm lg:text-base font-medium text-slate-50 tracking-wide'
      >
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.label}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props.register}
        name={props.label}
        placeholder={props.placeholder}
        className={`appearance-none outline-none font-medium w-full h-fit py-3 rounded-[10px] border-2 border-zinc-300 placeholder:placeholder-gray-500/50 text-slate-600 px-4 transition-all duration-200 ease-in-out ${
          isFocused
            ? ' bg-primary-lightest outline-2 outline-primary-light'
            : ' hover:outline-1 hover:outline-secondary-dark bg-gray-100'
        }`}
      />
    </div>
  )
}

export default CustomInput
