import { Icon } from '@iconify/react'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import parse from 'html-react-parser'
import { formatDate, formatDateFromString } from '../../helper/datesFormatter'
import { SCREEN } from '../../helper/responsive'
import BurgerMenu from '../BurgerMenu'
import Button from '../Button'
import PatientIdSection from '../dashboard/PatientIdSection'
import MainSectionNavBar from '../MainSectionNavBar'
import NeuralLabsTextLogo from '../NeuralLabsTextLogo'
import ImageSlides from './image-slides'
import ModelResults from './model-results'
import EditReport from './EditReportModal'
import { PatientContext } from '../../context/patient-context'
import {
  PatientContextType,
  PatientInfoData,
  PatientReportResult,
  ReportContextType,
} from '../../typings'

import Loading from '../../pages/loading'
import Link from 'next/link'
import { ReportContext } from '../../context/report-context'

const MainContentSection = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)
  const [isOpenModal, setModalOpen] = useState<boolean>(false)
  const patientContext = useContext<PatientContextType | null>(PatientContext)

  const reportContext = useContext<ReportContextType | null>(ReportContext)
  useEffect(() => {
    reportContext?.setPatientId(patientContext?.patientId || '')
  }, [patientContext?.patientId, reportContext])
  const report = reportContext?.getReportByKey()
  const isLoading = reportContext?.isLoading
  const isError = reportContext?.isError
  const isSuccess = reportContext?.isSuccess

  const handlePrintReport = () => {
    window.print()
  }
  const handleDownloadPdf = () => {
    // handle download the report to pdf
  }

  if (isError) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center space-y-3'>
        <p className='text-red-500 font-medium w-full text-center'>
          Oops, their was an error
        </p>
        <div className='w-fit'>
          <Link href='/'>
            <Button type='button'>Go back</Button>
          </Link>
        </div>
      </div>
    )
  }
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='w-full h-full print:flex-none flex flex-col gap-6 '>
      <MainSectionNavBar>
        <div className=' flex items-center space-x-1'>
          {isLargeDevice || (
            <Icon
              icon='ant-design:menu-outlined'
              className='h-7 w-7 text-gray-600 active:text-primary-light '
              onClick={() => setIsOpenMenu(true)}
            />
          )}
          {isLargeDevice || (
            <BurgerMenu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu}>
              {<PatientIdSection />}
            </BurgerMenu>
          )}
          <p className='text-gray-500 font-light italic h-full capitalize'>
            inference at{' '}
            {report?.created_at
              ? formatDateFromString(report?.created_at)
              : 'N0 created at date for this report'}
          </p>
        </div>
        {isLargeDevice && <NeuralLabsTextLogo />}
        <div className='italic text-gray-400 text-xs lg:text-sm'>
          {patientContext?.patientId || 'No ID'}
        </div>
      </MainSectionNavBar>
      {!report ? (
        <div className='w-full h-screen flex flex-col justify-center items-center space-y-3'>
          <p className='text-white font-medium text-lg w-full text-center'>
            No patient report Add some images to start editing report
          </p>
          <div className='w-fit'>
            <Link href='/'>
              <Button type='button'>Go to adding images</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='relative w-full h-full lg:border-2 border-primary-light backdrop-blur lg:rounded-2xl overflow-y-hidden bg-gray-50/95'>
          <div className='px-4 lg:px-8 h-full w-full lg:overflow-y-scroll lg:scrollbar-thin lg:scrollbar-thumb-primary-light lg:scrollbar-track-primary-light/20 lg:scrollbar-thumb-rounded-[4px] lg:scroll-smooth'>
            <div className='py-3 w-full h-fit flex gap-x-1 justify-between items-center'>
              <div className='text-lg lg:text-2xl font-medium uppercase tracking-wider text-primary-dark/90'>
                Report
              </div>

              <div className='flex w-fit space-x-1 lg:space-x-3 print:hidden'>
                {/* download the report to a pdf */}
                {/* <Button type='button' hSize='py-5'>
                  download
                </Button> */}
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
                  <div className='break-all text-zinc-700 font-regular text-sm lg:text-base leading-loose print:first-letter:font-bold tracking-wider print:first-letter:text-7xl print:first-letter:text-white print:first-letter:mr-3 print:first-letter:float-left '>
                    {report?.report ? (
                      parse(report.report)
                    ) : (
                      <div className='flex flex-col space-y-10 mt-6 lg:mt-11 w-full h-full justify-center items-center px-4 '>
                        <p className='text-xl capitalize w-full text-center  font-regular italic text-secondary-dark'>
                          No Report
                        </p>
                        <Button
                          type='button'
                          outlined
                          onClick={() => setModalOpen(true)}
                        >
                          add a report
                        </Button>
                      </div>
                    )}
                  </div>
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
      )}

      {/* edit report */}
      {report && (
        <EditReport
          isOpen={isOpenModal}
          setModalOpen={setModalOpen}
          reportId={report?.id}
        />
      )}
    </div>
  )
}

export default MainContentSection
