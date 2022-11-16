import { Icon } from '@iconify/react'
import Image from 'next/image'
import { ChangeEvent, useRef, useState, useEffect } from 'react'
import { FileTypeError } from '../../../typings'

type Props = {}

const EditProfileImage = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined | null>(
    null
  )
  const [preview, setPreview] = useState<string | undefined>()
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])
  const [imageError, setError] = useState<FileTypeError | null>(null)
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // check if the user as slected more than one file
    if (e.target.files.length > 1) {
      setError({
        type: 'FILES_SELECTED_ERR',
        message: 'select one image file at a time',
      })
      setSelectedFile(undefined)
      return
    }
    // check if the user as selected the right size
    if (e.target.files[0].size > 10000000) {
      setError({
        type: 'FILESIZE_ERR',
        message: 'file allowed <strong>MUST</strong> be 10mbs and below',
      })
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
  }
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className='flex relative h-fit'>
      <Image
        className='relative h-24 w-24 lg:h-32 lg:w-32 rounded-full border-2 border-primary-light object-cover'
        src={
          preview ||
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
        }
        width={200}
        height={200}
        alt='profile image'
      />
      <button
        className='h-fit w-fit p-1.5 bg-primary-light rounded-full absolute bottom-5 right-1'
        onClick={(e) => {
          e.preventDefault()
          inputRef.current?.click()
        }}
      >
        <Icon
          icon={'clarity:edit-solid'}
          className='h-3.5 w-3.5 fill-current text-white'
        />
      </button>
      <input
        type={'file'}
        className='hidden'
        ref={inputRef}
        onChange={onSelectFile}
      />
    </div>
  )
}

export default EditProfileImage
