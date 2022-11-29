import { Icon } from '@iconify/react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Dispatch, SetStateAction, useState } from 'react'
import { SCREEN } from '../../helper/responsive'
import BurgerMenu from '../BurgerMenu'
import Button from '../Button'
import PatientIdSection from '../dashboard/PatientIdSection'
import MainSectionNavBar from '../MainSectionNavBar'
import NeuralLabsTextLogo from '../NeuralLabsTextLogo'
import ImageSlides from './image-slides'

type Props = {
  active: number
  setActive: Dispatch<SetStateAction<number>>
}

const MainContentSection = ({ active, setActive }: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)
  const isMediumDevice = useMediaQuery(`( min-width: ${SCREEN.md} )`)
  return (
    <div className='w-full h-auto flex flex-col gap-8'>
      <MainSectionNavBar>
        <div className=' flex items-center space'>
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
          {/* {isMediumDevice && (
            <div className='text-lg lg:text-2xl font-medium capitalize tracking-wider text-slate-500'>
              report
            </div>
          )} */}
        </div>
        {isLargeDevice && <NeuralLabsTextLogo />}
        <div className='italic text-gray-400 text-sm'>
          600d475fa96e305as2e48c9cfbb851qs
        </div>
      </MainSectionNavBar>
      <div className='px-4 lg:px-8 h-full w-full pb-3 bg-gray-50/95 lg:rounded-2xl lg:border-2 border-primary-light'>
        <div className='h-full w-full flex flex-col space-y-2'>
          <div className=' py-3 w-full h-fit flex gap-x-1 justify-between items-center'>
            <div className='text-lg lg:text-2xl font-medium uppercase tracking-wider text-primary-dark/90'>
              report
            </div>
            <div className='flex w-fit space-x-1 lg:space-x-3'>
              {/* download the report to a pdf */}
              <Button type='button' hSize='py-5'>
                download
              </Button>
              <button
                className='bg-gray-500/10 rounded-full flex items-center justify-center py-1.5 px-1.5'
                title='print the report'
              >
                <Icon
                  icon={'material-symbols:print-outline-rounded'}
                  className='h-8 w-8 fill-current text-primary-dark/90'
                />
              </button>
            </div>
          </div>
          <div className=' w-full h-full bg-gray-50/5 backdrop-blur lg:rounded-2xl overflow-y-hidden'>
            <section className='w-full h-full xl:flex overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-light scrollbar-track-primary-light/20 scrollbar-thumb-rounded-[4px] scroll-smooth '>
              <div className='w-[42%] flex flex-col space-y-5'>
                {/* right section*/}
                <div className='h-fit w-full'>
                  {/* image from backend along side the pathologies found and their modality */}
                  <ImageSlides />
                </div>
                <div className='flex flex-col space-y-3 w-full '>
                  <div className='flex space-x-4 w-full justify-center items-center'>
                    <h4 className='text-primary-dark/90 text-xl font-medium capitalize underline underline-offset-1 decoration-primary'>
                      Doctor&apos;s Remarks
                    </h4>
                    <button
                      className='text-primary-dark/90 cursor-pointer'
                      title='edit'
                    >
                      <Icon
                        icon={'material-symbols:edit-square-outline'}
                        className='h-6 w-6 fill-current '
                      />
                    </button>
                  </div>
                  <p className=' text-slate-700 font-medium text-sm lg:text-base tracking-wide leading-loose'>
                    Opacity is observed in right lung and left lower zone.
                    Inhomogeneous Opacity, probable Consolidation is observed in
                    bilateral lower zones. Pleural Effusion is observed in
                    bilateral lower zones and right mid zoneBlunting of CP angle
                    is observed in bilateral lower zonesThe Heart is enlarged.
                    CardiomegalyBoth hila appear normalBony thorax appears
                    unremarkable
                  </p>
                </div>
              </div>
              <div className='w-[58%]'>{/* left section */}</div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContentSection
