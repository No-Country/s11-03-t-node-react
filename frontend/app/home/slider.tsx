'use client'

import Slider from 'react-slick'

type Props = {
  children: React.ReactNode
}

const MySlider = ({ children }: Props) => {
  var settings = {   
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0, 
    responsive: [    
        {
            breakpoint: 1280,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              initialSlide: 1
            }
        },   
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },       
      ]          
  }

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
      />
      <Slider {...settings}>{children}</Slider>
    </>
  )
}

export default MySlider
