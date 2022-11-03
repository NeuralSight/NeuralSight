import { Icon } from '@iconify/react'
import { Dispatch, SetStateAction, RefObject } from 'react'
import { calFileSizeBytesToKbsToGbs } from '../../../helper/fileInfoHelper'
import { FileInfo } from '../../../typings'

type Props = {
  file: FileInfo
  fileList: File[]
  setFileInfo: Dispatch<SetStateAction<File[] | undefined>>
  inputFileRef: RefObject<HTMLInputElement>
}
const FilePreviewCard = ({
  file,
  fileList,
  setFileInfo,
  inputFileRef,
}: Props) => {
  const handleDeleteAFile = () => {
    const RemainFileList = Array.from(fileList).filter(
      (item) =>
        item.lastModified !== file.lastModified && item.name !== item.name
    )
    setFileInfo(RemainFileList)
    if (inputFileRef.current?.value !== undefined) {
      inputFileRef.current.value = ''
    }
  }
  return (
    <div className='w-full flex justify-between px-2 py-1.5 h-fit text-zinc-500 bg-primary-light/10 rounded-lg border-2 border-gray-300'>
      <div className='flex space-x-2'>
        <Icon
          icon={
            file?.type == 'image/jpeg'
              ? 'ant-design:file-jpg-outlined'
              : 'bxs:file-png'
          }
          className='h-11 w-11 fill-current'
        />
        <div className='flex flex-col space-y-0.5 font-medium text-left'>
          <p>{file.name}</p>
          <p className='text-sm'>{calFileSizeBytesToKbsToGbs(file.size)}</p>
        </div>
      </div>
      <div className='flex space-x-2 justify-center items-center'>
        <Icon
          icon='akar-icons:link-chain'
          className='h-6 w-6 fill-current cursor-pointer opacity-80 hover:opacity-100 transition duration-200'
        />
        <Icon
          icon='icons8:cancel'
          className='h-6 w-6 fill-current cursor-pointer opacity-80 hover:opacity-100 transition duration-200'
          onClick={handleDeleteAFile}
        />
      </div>
    </div>
  )
}

export default FilePreviewCard
