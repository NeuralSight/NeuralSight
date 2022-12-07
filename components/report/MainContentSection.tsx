import { Icon } from '@iconify/react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Dispatch, SetStateAction, useState } from 'react'
import parse from 'html-react-parser'
import { formatDate } from '../../helper/datesFormatter'
import { SCREEN } from '../../helper/responsive'
import BurgerMenu from '../BurgerMenu'
import Button from '../Button'
import PatientIdSection from '../dashboard/PatientIdSection'
import MainSectionNavBar from '../MainSectionNavBar'
import NeuralLabsTextLogo from '../NeuralLabsTextLogo'
import ImageSlides from './image-slides'
import ModelResults from './model-results'
import RichTextEditor from '../RichTextEditor'
import Modal from '../Modal'

type Props = {
  active: number
  setActive: Dispatch<SetStateAction<number>>
}

const MainContentSection = ({ active, setActive }: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)
  const [isOpen, setModalOpen] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())

  const [report, setReport] = useState(
    '<p>Opacity is observed in right lung and left lower zone.Inhomogeneous Opacity, probable Consolidation is observed in bilateral lower zones. Pleural Effusion is observed in bilateral lower zones and right mid zoneBlunting of CP angle is observed in bilateral lower zonesThe Heart is enlarged. CardiomegalyBoth hila appear normalBony thorax appears unremarkable</p>'
  )

  const handlePrintReport = () => {
    window.print()
  }
  const handleDownloadPdf = () => {
    // handle download the report to pdf
  }

  return (
    <div className='w-full h-full print:flex-none flex flex-col gap-6 '>
      <MainSectionNavBar>
        <div className=' flex items-center'>
          {isLargeDevice || (
            <Icon
              icon='ant-design:menu-outlined'
              className='h-7 w-7 text-gray-600 active:text-primary-light'
              onClick={() => setIsOpenMenu(true)}
            />
          )}
          {isLargeDevice || (
            <BurgerMenu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu}>
              {<PatientIdSection />}
            </BurgerMenu>
          )}
          <p className='text-gray-500 font-light italic h-full capitalize'>
            last edited {formatDate(date)}
          </p>
        </div>
        {isLargeDevice && <NeuralLabsTextLogo />}
        <div className='italic text-gray-400 text-sm'>
          600d475fa96e305as2e48c9cfbb851qs
        </div>
      </MainSectionNavBar>
      <div className='relative w-full h-full lg:border-2 border-primary-light backdrop-blur lg:rounded-2xl overflow-y-hidden bg-gray-50/95'>
        <div className='px-4 lg:px-8 h-full w-full lg:overflow-y-scroll lg:scrollbar-thin lg:scrollbar-thumb-primary-light lg:scrollbar-track-primary-light/20 lg:scrollbar-thumb-rounded-[4px] lg:scroll-smooth'>
          <div className='py-3 w-full h-fit flex gap-x-1 justify-between items-center'>
            <div className='text-lg lg:text-2xl font-medium uppercase tracking-wider text-primary-dark/90'>
              report
            </div>

            <div className='flex w-fit space-x-1 lg:space-x-3 print:hidden'>
              {/* download the report to a pdf */}
              <Button type='button' hSize='py-5'>
                download
              </Button>
              <button
                className='hover:bg-gray-500/[15%] transition-all duration-500 ease-in-out shadow-md hover:shadow-none rounded-full flex items-center justify-center py-1.5 px-1.5'
                title='print the report'
                onClick={handlePrintReport}
              >
                <Icon
                  icon={'material-symbols:print-outline-rounded'}
                  className='h-8 w-8 fill-current text-primary-dark/90'
                />
              </button>
            </div>
          </div>
          <section className='w-full print:flex-none h-full xl:flex xl:space-x-5 xl:space-y-0 space-y-5'>
            <div className='w-full xl:w-[42%] flex flex-col space-y-5'>
              {/* right section*/}
              <div className='h-fit w-full print:hidden'>
                {/* image from backend along side the pathologies found and their modality */}
                <ImageSlides />
              </div>
              <div className='flex flex-col space-y-3 w-full '>
                <div className='flex space-x-4 w-full justify-center items-center'>
                  <h4 className='text-primary-dark/90 text-xl font-medium capitalize print:no-underline underline underline-offset-1 decoration-primary'>
                    Doctor&apos;s Remarks
                  </h4>
                  <button
                    className='print:hidden text-primary-dark/90 cursor-pointer'
                    title='edit'
                    onClick={() => setModalOpen(true)}
                  >
                    <Icon
                      icon={'material-symbols:edit-square-outline'}
                      className='h-6 w-6 fill-current '
                    />
                  </button>
                </div>
                <p className=' text-zinc-700 font-regular text-sm lg:text-base leading-loose print:first-letter:font-bold print:first-letter:text-4xl print:first-letter:'>
                  {parse(report)}
                </p>
              </div>
            </div>
            <div className='w-full xl:w-[58%]'>
              {/* left section */}
              <ModelResults />
            </div>
          </section>
        </div>
        <div className='absolute z-[40] bottom-0 bg-gradient-to-t from-gray-50/95 via-gray-50/60 to-transparent h-12 w-full'></div>
      </div>
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
        <RichTextEditor report={report} setReport={setReport} />
      </Modal>
    </div>
  )
}

export default MainContentSection
