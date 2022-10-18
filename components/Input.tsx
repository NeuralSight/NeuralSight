import {
  FormControl,
  InputLabel,
  Box,
  OutlinedInput,
  InputAdornment,
} from '@mui/material'
import React from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types'
import styled from '@emotion/styled'
import { FieldValue } from 'react-hook-form/dist/types/fields'

type Props = {
  id: string
  label: string | undefined
  type: 'text' | 'tel' | 'password' | 'number' | 'email'
  register: object
  icon: React.ReactNode
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
    },
    '&:hover fieldset': {
      borderColor: 'rbga(24, 24, 24)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#16C2D5',
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
const InputRadius = '10px'

const InputField = (props: Props) => {
  return (
    <Box
      sx={{ maxWidth: '100%', width: 'auto', m: 1, borderRadius: InputRadius }}
    >
      <CustomFormControl
        fullWidth
        className='rounded-lg'
        variant='outlined'
        size='medium'
      >
        <InputLabel
          htmlFor={props.id}
          sx={{
            textDecoration: 'capitalized',
            width: 'fit',
            textAlign: 'center',
          }}
        >
          {props.label}
        </InputLabel>
        <OutlinedInput
          sx={{ borderRadius: InputRadius }}
          id={props.id}
          type={props.type}
          {...props.register}
          endAdornment={
            <InputAdornment position='end'>{props.icon}</InputAdornment>
          }
          label={props.label}
        />
      </CustomFormControl>
    </Box>
  )
}

export default InputField
