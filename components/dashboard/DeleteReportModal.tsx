import { Dispatch, SetStateAction, MouseEvent, useContext } from 'react'
import Modal from '../Modal'
import Button from '../Button'
import { getStorageItem } from '../../helper/localStorageAccess'
import { Icon } from '@iconify/react'
import { ReportContextType } from '../../typings'
import { ReportContext } from '../../context/report-context'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  reportId: string
}

const DeletePatientModal = (props: Props) => {
  const reportContext = useContext<ReportContextType | null>(ReportContext)
  const handleDeletePatientReport = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reportContext?.deleteSelectedPatientReport(props.reportId)
  }
  return (
    <Modal
      style={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '8px',
        p: 4,
      }}
      title={`Deletion`}
      open={props.open}
      setOpen={props.setOpen}
    >
      <div className='py-2 flex flex-col gap-3 w-full'>
        <div className='flex gap-2 justify-between items-center'>
          <Icon
            icon='material-symbols:warning-rounded'
            className='fill-current text-orange-500 w-12 h-12'
          />
          <p className='font-medium text-sm '>
            Are you sure you want to delete patient image with id and it&#39;s
            report
            <strong> {props.reportId} </strong>
          </p>
        </div>

        <div className='w-full flex gap-4'>
          <button
            className='w-full max-h-[24px] flex items-center justify-center cursor-pointer rounded-xl fill-current border-2 border-red-500  px-4 py-6 bg-red-500 hover:bg-red-600 text-white'
            onClick={handleDeletePatientReport}
          >
            {reportContext?.isDeletionLoading ? 'Deleting...' : 'delete'}
          </button>
          <Button outlined onClick={() => props.setOpen(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
export default DeletePatientModal
