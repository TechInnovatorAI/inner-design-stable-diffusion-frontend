// ** React Imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { EffectCoverflow } from 'swiper/modules'

// ** MUI Imports
import { Button, Modal } from '@mui/material'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/swiper-bundle.css'

const SwiperModal = ({
  open,
  setOpen,
  images,
  initShow
}: {
  open: boolean
  setOpen: (boolean: boolean) => void
  images: string[]
  initShow: number
}) => {
  const handleClose = () => setOpen(false)

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby='image-modal' aria-describedby='image-modal-description'>
      <>
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          effect='coverflow'
          initialSlide={initShow}
        >
          {images?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  height={'100%'}
                  src={item}
                  alt={item}
                  style={{ display: 'block', margin: 'auto', marginTop: 150, borderRadius: '10px' }}
                />
              </SwiperSlide>
            )
          })}
          {/* <div className='swiper-button-next' style={{ right: 400 }} onClick={() => swiper.slideNext()}></div>
          <div className='swiper-button-prev' style={{ left: 400 }} onClick={() => swiper.slidePrev()}></div> */}
        </Swiper>
        <Button sx={{ position: 'absolute', bottom: 100, right: 400, zIndex: 20 }} onClick={handleClose}>
          close
        </Button>
      </>
    </Modal>
  )
}

export default SwiperModal
