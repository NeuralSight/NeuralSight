// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import React, { useContext } from 'react'
import 'swiper/css'
import 'swiper/css/effect-cards'

// import required modules
import { EffectCards } from 'swiper'

// get example image data
import ImageCard from './ImageCard'
import { ReportContext } from '../../../context/report-context'

const ImageSlides = () => {
  const reportContext = useContext(ReportContext)
  const reportAll = reportContext?.getAllReport()

  return (
    <Swiper
      effect={'cards'}
      grabCursor={true}
      modules={[EffectCards]}
      className='mySwiper'
      onSlideChange={(swiper) => {
        reportContext?.setSetCurrentId(swiper.snapIndex)
        return console.log('changed', swiper.snapIndex)
      }}
    >
      {reportAll &&
        reportAll?.length > 0 &&
        reportAll?.map((item, key) => (
          <SwiperSlide key={key}>
            <ImageCard patientReportResult={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ImageSlides
