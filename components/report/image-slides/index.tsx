// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import React from 'react'
import 'swiper/css'
import 'swiper/css/effect-cards'

// import required modules
import { EffectCards } from 'swiper'

// get example image data
import { SampleImagesArr } from '../../dashboard/MainContentSection'
import ImageCard from './ImageCard'

type Props = {}

const ImageSlides = (props: Props) => {
  return (
    <Swiper
      effect={'cards'}
      grabCursor={true}
      modules={[EffectCards]}
      className='mySwiper'
    >
      {SampleImagesArr.map((item, key) => (
        <SwiperSlide key={key + item.patientID}>
          <ImageCard imageDetails={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSlides
