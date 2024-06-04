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
        <img src="../user_Image/Banner.png"/>
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