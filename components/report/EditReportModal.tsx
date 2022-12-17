import RichTextEditor from '../RichTextEditor'
import Modal from '../Modal'
import {
  Dispatch,
  SetStateAction,
  useState,
  MouseEvent,
  SyntheticEvent,
} from 'react'
import Button from '../Button'
import { useMutation } from '@tanstack/react-query'
import { updatePatientReport } from '../../utils/config'
import { PatientReport } from '../../typings'
import useErrorMsgHandler from '../../hooks/use-error-msg-handler'
import ErrorMessage from '../Message'

type Props = {
  isOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  reportId: string
}

const EditReport = ({ isOpen, setModalOpen, reportId }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const { setDetails } = useErrorMsgHandler({ setError })
  const [success, setSuccess] = useState<string | null>(null)
  const [report, setReport] = useState<string>(
    '<p>Opacity is observed in the right lung and left lower zone. Inhomogeneous Opacity, probable Consolidation is observed in bilateral lower zones. Pleural Effusion is observed in bilateral lower zones and right mid zone Blunting of CP angle is observed in bilateral lower zonesThe heart is enlarged. CardiomegalyBoth hila appear normalBony thorax appears unremarkable</p>'
  )

  const { isLoading, mutate, status } = useMutation(updatePatientReport, {
    onMutate: async (report) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      // await currentClient.cancelQueries('patients')
      // Snapshot the previous value
      // const previousPatients = currentClient.getQueryData('patients')
      // Optimistically update to the new value
      // currentClient.setQueryData('patients', (old) => [...old, newPatient])
      // Return a context object with the snapshotted value
      // return { previousPatients }
      console.log('report', report)
    },
  })
  // handle Submit
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    // animate uploading the show when finished and list the file
    // if clicks save changes upload the files

    //image data
    const patientData: PatientReport = {
      reportId: reportId,
      report: report,
    }

    mutate(patientData, {
      onSuccess: async (response, variable, context) => {
        const data = await response.json()
        if (response.status === 201 || response.status === 200) {
          console.log('data', data)
          setSuccess(data.message)
          // currentClient.invalidateQueries('patient')
        } else {
          const detail = data.detail
          console.log('detail', detail)
          setDetails(detail)
        }
      },
      onError: async (err: any, variables, context) => {
        // currentClient.setQueryData('patient', context.previousPatients)
        setError(err)
        console.log('Error while posting...', err)
        console.log('data sent is', variables)
      },
      onSettled: async () => {
        // currentClient.invalidateQueries('patient')
      },
    })
    // submit result to backend
  }
  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setModalOpen(false)
    console.log('close', close)
  }
  return (
    <Modal
      title='Edit Remarks'
      description=''
      open={isOpen}
      style={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '8px',
        p: 4,
      }}
      setOpen={setModalOpen}
    >
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <div className='pb-3 flex flex-col space-x-2'>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
          {success && <ErrorMessage isSuccess>{success}</ErrorMessage>}
        </div>
        <RichTextEditor report={report} setReport={setReport} />
        <div className='flex w-full space-x-4'>
          <Button type='submit'>{isLoading ? 'updating...' : 'update'}</Button>
          <Button type='button' outlined onClick={handleClose}>
            cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditReport
