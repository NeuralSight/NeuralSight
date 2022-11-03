import { Icon } from '@iconify/react'
import {
  useRef,
  useState,
  DragEvent,
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
  useEffect,
} from 'react'
import { FileInfo } from '../../../typings'
import Button from '../../Button'
import ErrorMessage from '../../ErrorMessage'
import FilePreviewCard from './FilePreviewCard'

type Props = {}

type FileTypeError = {
  type: 'FILETYPE_ERR' | 'FILESIZE_ERR'
  message: string | 'oops something went wrong'
}
const UploadFile = (props: Props) => {
  // drag state
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [fileInfo, setFileInfo] = useState<FileList>()
  const [error, setError] = useState<FileTypeError | null>(null)

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
      console.log('drag leave')
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
      handleFiles(e.dataTransfer.files)
    }
  }
  // triggers when file is selected with click
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      // at least one file has been dropped so do something
      handleFiles(e.target.files)
    }
  }
  // triggers the input when the button is clicked
  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    inputRef.current?.click()
  }

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      console.log('files[i].type', files[i].type)
      if (
        files[i].type !== 'image/jpeg' &&
        files[i].type !== 'image/png' &&
        files[i].type !== 'image/dicom'
      ) {
        // raise an error
        setError({
          type: 'FILETYPE_ERR',
          message: 'wrong file type only images allowed!',
        })
        break
      }
      // set file info in the file state handler
      setFileInfo(files)
      setError(null)
      return files
    }
  }

  // handle Submit
  const handleSubmit = (e: SyntheticEvent) => {
    // animate uploading the show when finished and list the file
    // if clicks save changes upload the files
    e.preventDefault()
    // submit result to backend
  }

  // handle clear all files
  const handleClearSelectedFile = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(inputRef.current?.files)
  }

  return (
    <form
      // encType='multipart/form-data'
      className='h-fit w-[28rem] max-w-full text-center position relative'
      onDragEnter={handleDrag}
      onSubmit={handleSubmit}
    >
      <div className='pb-3'>
        {error && <ErrorMessage>{error?.message}</ErrorMessage>}
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
                  file={file}
                  key={`${file.lastModified} ${file.name} ${file.lastModifiedDate}`}
                />
              ))
            : null}
        </div>
      </div>
      <div className='flex w-full space-x-4'>
        <Button type='submit'>save</Button>
        <Button type='button' outlined>
          cancel
        </Button>
      </div>
    </form>
  )
}

export default UploadFile
