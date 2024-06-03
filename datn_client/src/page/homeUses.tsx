import React from 'react'
import SwiperUser from '../components/SwiperUser'
import "../styles/homeUses.css"
import IntroduceUser from '../components/IntroduceUser'
import CategoryUser from '../components/CategoryUser'
import NewsUser from '../components/NewsUser'
import PathologyUser from '../components/PathologyUser'

const HomeUses = () => {
  return (
    <>
      <div>
        <SwiperUser/>
      </div>
      <div className='img_home'>
        <img src="https://hcdc.vn/public/img/02bf8460bf0d6384849ca010eda38cf8e9dbc4c7/images/dangbai2/images/file-thong-diep-truyen-thong-ve-loi-ich-tiem-vac-xin-phong-covid19-cho-tre-em/images/F6AF7ECB-BD5D-491A-AF58-FB7728D51480.jpeg"/>
      </div>
      <div className='img_home'>
        <IntroduceUser/>
      </div>
      <div className='img_home'>
        <CategoryUser/>
      </div>
      <div className='img_home'>
        <NewsUser/>
      </div>
      <div className='img_home'>
        <PathologyUser/>
      </div>
    </>
    
    
  )
}

export default HomeUses