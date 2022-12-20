import {
  FormControl,
  InputLabel,
  Box,
  OutlinedInput,
  InputAdornment,
} from '@mui/material'
import { ChangeEvent } from 'react'
import styled from '@emotion/styled'

type Props = {
  id: string
  label?: string | undefined
  placeholder?: string | undefined
  type: 'text' | 'tel' | 'password' | 'number' | 'email'
  register?: object | undefined
  ref?: React.RefObject<unknown> | undefined
  icon?: React.ReactNode | undefined
  size?: 'medium' | 'small' | undefined
  borderRadius?: string | undefined
  isUsingReactHookForm?: boolean
  value?: number | string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const CustomFormControl = styled(FormControl)({
  '& label.Mui-focused': {
    color: '#16C2D5',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#16C2D5',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rbga(137, 137, 137,0.8)',
      background: 'rgba(215, 186, 173, 0.2)',
      zIndex: '1',
    },
    '&:hover fieldset': {
      borderColor: 'rbga(24, 24, 24)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#16C2D5',
      zIndex: '1',
      background: 'rgba(22, 194, 213, 0.1)',
    },
  },
})

const CustomOutlinedInput = styled(OutlinedInput)({})
/**
 * Input field
 * @param props.type 'text' | 'tel' | 'password' | 'number' | 'email'
 *
 * @returns
 */

const InputField = ({
  borderRadius,
  register,
  ref,
  id,
  label,
  icon,
  size,
  type,
  value,
  placeholder,
  isUsingReactHookForm = true,
  onChange,
}: Props) => {
  let InputRadius = borderRadius || '10px'
  return (
    <Box
      sx={{
        maxWidth: '100%',
        width: 'auto',
        m: 1,
        borderRadius: InputRadius,
        fontWeight: '600',
      }}
    >
      <CustomFormControl
        color='warning'
        fullWidth
        variant='outlined'
        size={size}
      >
        <InputLabel
          htmlFor={id}
          sx={{
            textDecoration: 'capitalized',
            width: 'fit',
            textAlign: 'center',
          }}
        >
          {label}
        </InputLabel>
        {isUsingReactHookForm ? (
          <OutlinedInput
            sx={{ borderRadius: InputRadius }}
            id={id}
            ref={ref}
            type={type}
            {...register}
            placeholder={placeholder}
            endAdornment={
              <InputAdornment position='end'>{icon}</InputAdornment>
            }
            label={label}
          />
        ) : (
          <OutlinedInput
            sx={{ borderRadius: InputRadius }}
            id={id}
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            endAdornment={
              <InputAdornment position='end'>{icon}</InputAdornment>
            }
            label={label}
          />
        )}
      </CustomFormControl>
    </Box>
  )
}

export default InputField
