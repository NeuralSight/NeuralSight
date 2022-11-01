import { Icon } from '@iconify/react'
import React, {
  useRef,
  useState,
  DragEvent,
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
} from 'react'

type Props = {}

const UploadFile = (props: Props) => {
  // drag state
  const [dragActive, setDragActive] = useState<boolean>(false)

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
      // animate uploading the show when finished and list the file
      // if clicks save changes upload the files
      // handleFiles(e.dataTransfer.files);
      console.log('files', e.dataTransfer.files)
    }
  }
  // triggers when file is selected with click
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      // at least one file has been dropped so do something
      // animate uploading the show when finished and list the file
      // if clicks save changes upload the files
      // at least one file has been selected so do something
      // handleFiles(e.target.files);
      console.log('files', e.target.files)
    }
  }
  // triggers the input when the button is clicked
  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    inputRef.current?.click()
  }
  // handle Submit
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    // submit result to backend
  }
  return (
    <form
      // encType='multipart/form-data'
      className='h-[16rem] w-[28rem] max-w-full text-center position relative'
      onDragEnter={handleDrag}
      onSubmit={handleSubmit}
    >
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
        className={`group transition-all duration-200 ease-in-out h-full flex items-center justify-center border-2 rounded-2xl border-dashed 
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
      <div>{/* listing all the files and preview them*/}</div>
      <div className=''>{/* buttons*/}</div>
    </form>
  )
}

export default UploadFile
