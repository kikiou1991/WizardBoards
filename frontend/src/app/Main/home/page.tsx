import React from 'react'
import NavbarTop from '../components/navbar/navbar'
import FakeBar from '../components/dropDown'
import Sidebar from '../components/sidebar/sidebar'
import Project from '../projects/page'
const Home = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='w-full'>
        <NavbarTop />

      </div>
      <div className=' w-full  flex flex-row flex-grow'>
        <div className='w-1/6 h-full'>
          <Sidebar/>
        </div>
        <div className='w-5/6 h-full'>
          <Project/>
        </div>

      </div>
    </div>
        
    
    
  )
}

export default Home