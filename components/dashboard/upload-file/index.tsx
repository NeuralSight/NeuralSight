import { Icon } from '@iconify/react'
import {
  useRef,
  useState,
  DragEvent,
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react'
import { FileInfo, FileTypeError } from '../../../typings'
import Button from '../../Button'
import ErrorMessage from '../../Message'
import FilePreviewCard from './FilePreviewCard'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postPatientImage } from '../../../utils/config'
import useErrorMsgHandler from '../../../hooks/use-error-msg-handler'
import { ContentType } from '../../../lang/content-type'

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>
  patientId: string
}

const UploadFile = (props: Props) => {
  const [messageOpen, setMessageOpen] = useState<boolean>(false)
  const [successMessageOpen, setSuccessMessageOpen] = useState<boolean>(false)
  // states
  const [success, setSuccess] = useState<string | null>(null)
  // drag state
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [fileInfo, setFileInfo] = useState<File[]>()
  const [error, setError] = useState<string | null>(null)
  const [fileError, setFileError] = useState<FileTypeError | null>(null)

  // error messages handling hook
  const { setDetails, detail } = useErrorMsgHandler({ setError })

  // close modal
  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.setOpen(false)
  }

  // use query
  const currentClient = useQueryClient()

  const uploadedFileNo = 0
  // ref
  const inputRef = useRef<HTMLInputElement>(null)

  // handle drag events
  const handleDrag = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      // console.log('drag leave')
      setDragActive(false)
    }
  }
  // triggers when file is dropped
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }
  // triggers when file is selected with click
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      // at least one file has been dropped so do something
      handleFiles(Array.from(e.target.files))
    }
  }
  // triggers the input when the button is clicked
  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    inputRef.current?.click()
  }

  const handleFiles = (files: File[]) => {
    setMessageOpen(true)
    for (let i = 0; i < files.length; i++) {
      if (
        files[i].type !== 'image/jpeg' &&
        files[i].type !== 'image/png' &&
        files[i].type !== 'image/dicom'
      ) {
        // raise an error
        setFileError({
          type: 'FILETYPE_ERR',
          message: 'wrong file type only images allowed!',
        })
        return
      }
      if (files[i].size > 100000000) {
        setFileError({
          type: 'FILESIZE_ERR',
          message: 'file allowed <strong>MUST</strong> be 100mbs and below',
        })
        return
      }
      // set file info in the file state handler
      setFileInfo(files)
      setFileError(null)
    }
  }

  const { isLoading, mutate, status } = useMutation(postPatientImage, {
    onMutate: async (newPatient) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      // await currentClient.cancelQueries('patients')
      // Snapshot the previous value
      // const previousPatients = currentClient.getQueryData('patients')
      // Optimistically update to the new value
      // currentClient.setQueryData('patients', (old) => [...old, newPatient])
      // Return a context object with the snapshotted value
      // return { previousPatients }
      console.log('newPatient from uploading file', newPatient)
    },
  })
  // handle Submit
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    // animate uploading the show when finished and list the file
    // if clicks save changes upload the files
    setMessageOpen(true)
    setSuccessMessageOpen(true)
    //image data
    const imageData = {
      file: fileInfo && fileInfo[0],
      patientId: props.patientId,
    }
    console.log('imageData', imageData)

    mutate(imageData, {
      onSuccess: async (response, variable, context) => {
        const data = await response.json()
        if (response.status === 201 || response.status === 200) {
          console.log('data', data)
          setSuccess(data.message)
          currentClient.invalidateQueries(['patients'])
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
  }

  // handle clear all files
  const handleClearSelectedFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFileInfo(undefined)
    if (inputRef.current?.value !== undefined) {
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setFileError(null)
      setError(null)
      // setSuccess(null)
    }, 9000)
  })

  return (
    <form
      className='h-fit w-[28rem] max-w-full text-center position relative'
      onDragEnter={handleDrag}
      onSubmit={handleSubmit}
      encType={ContentType.MultiPart}
    >
      <div className='pb-3 flex flex-col space-x-2'>
        {error || fileError ? (
          <ErrorMessage isOpen={messageOpen} setMessageOpen={setMessageOpen}>
            {error || fileError?.message}
          </ErrorMessage>
        ) : null}
        {success && (
          <ErrorMessage
            isSuccess
            isOpen={successMessageOpen}
            setMessageOpen={setSuccessMessageOpen}
          >
            {success}
          </ErrorMessage>
        )}
      </div>
      <input
        ref={inputRef}
        type='file'
        id='input-file-upload'
        multiple={true}
        className='hidden'
        onChange={handleChange}
      />
      <label
        id='label-file-upload'
        htmlFor='input-file-upload'
        className={`group transition-all duration-200 ease-in-out h-[14rem] flex items-center justify-center border-2 rounded-2xl border-dashed 
        hover:border-primary-light  hover:bg-primary-lightest  ${
          dragActive
            ? 'border-primary-light bg-primary-lightest text-primary-light'
            : 'border-primary-dark bg-[#f8fafc] text-slate-900'
        }`}
      >
        <div className='group-hover:text-primary-light justify-center flex flex-col items-center'>
          <Icon
            icon='ant-design:file-image-outlined'
            className={`h-16 w-16 fill-current group-hover:text-primary-light ${
              dragActive ? 'text-primary-light' : 'text-primary-dark'
            }`}
          />
          <p>Drag and drop your file here or</p>
          <button
            style={{ fontFamily: 'Oswald' }}
            onClick={onButtonClick}
            className='text-blue-500 hover:underline hover:underline-offset-2 hover:decoration-blue-500 bg-transparent text-base border-none cursor-pointer'
          >
            Upload a file
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          className='absolute w-full h-full rounded-2xl top-0 right-0 bottom-0 left-0'
          id='drag-file-element'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
      <div className='w-full space-y-3 pt-8 pb-4'>
        {/* listing all the files and preview them*/}
        <div className='flex justify-between items-center text-zinc-500 text-sm xl:text-base px-2'>
          <p className=''>
            {`${uploadedFileNo} of   ${
              !fileInfo?.length ? 0 : fileInfo?.length
            } uploaded`}
          </p>
          <button
            className='cursor-pointer text-red-400 hover:text-red-500 transition duration-200'
            onClick={handleClearSelectedFile}
          >
            cancel
          </button>
        </div>
        <div className='max-h-[150px] h-fit overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-light scrollbar-track-primary-light/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroll-smooth space-y-2 pr-3 py-3'>
          {fileInfo
            ? Array.from(fileInfo).map((file: FileInfo) => (
                <FilePreviewCard
                  fileList={fileInfo}
                  setFileInfo={setFileInfo}
                  file={file}
                  key={`${file.lastModified} ${file.name} ${file.lastModifiedDate}`}
                  inputFileRef={inputRef}
                />
              ))
            : null}
        </div>
      </div>
      <div className='flex w-full space-x-4'>
        <Button type='submit'>
          {isLoading ? 'saving & predicting...' : 'save'}
        </Button>
        <Button type='button' outlined onClick={handleClose}>
          cancel
        </Button>
      </div>
    </form>
  )
}

export default UploadFile
