import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import InputField from '../../inputs/CustomInput'
import Button from '../../Button'
import Title from '../Title'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FIELD_REQUIRED_ERR_MSG,
  PASSWORD_LENGTH_ERR_MSG,
  PASSWORD_MISMATCH_ERR_MSG,
  PASSWORD_REQUIRED_ERR_MSG,
} from '../../../lang/error-messages'

type Props = {}

const formSchema = Yup.object().shape({
  oldpass: Yup.string()
    .required(FIELD_REQUIRED_ERR_MSG)
    .min(8, PASSWORD_LENGTH_ERR_MSG),
  newpass: Yup.string()
    .required(PASSWORD_REQUIRED_ERR_MSG)
    .min(8, PASSWORD_LENGTH_ERR_MSG),
  confirmpass: Yup.string()
    .required(FIELD_REQUIRED_ERR_MSG)
    .oneOf([Yup.ref('password')], PASSWORD_MISMATCH_ERR_MSG),
})
const formOptions = { resolver: yupResolver(formSchema) }

const EditPassword = (props: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>(formOptions)

  console.log('errors', errors)
  const onSubmit: SubmitHandler<FieldValues> = (data) =>
    console.log('data', data)
  return (
    <form
      className='w-full xl:w-3/4 flex flex-col space-y-8 '
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex'>
        <Title>Edit Password</Title>
      </div>
      <InputField
        type='password'
        label='old password'
        control={control}
        spaceY='2'
        fieldName='oldpass'
        // rules={{
        //   required: FIELD_REQUIRED_ERR_MSG,
        // }}
      />
      <InputField
        type='password'
        label='new password'
        control={control}
        spaceY='2'
        fieldName='newpass'
      />
      <InputField
        type='password'
        label='confirm password'
        control={control}
        spaceY='2'
        fieldName='confirmpass'
      />
      <div className='grid gap-2 grid-cols-1 md:grid-cols-2 h-fit pb-3'>
        <Button type='submit'>Save Changes</Button>
        <Button type='button' outlined>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default EditPassword
