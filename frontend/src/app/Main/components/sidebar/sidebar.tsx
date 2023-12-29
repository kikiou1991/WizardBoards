import React from 'react'
import BoardView from './components/boardview'
import CurrentProject from './components/currentproject'
import WorkspaceView from './components/workspaceview'
import YourBoards from './components/yourboards'

const Sidebar = () => {
  return (
    <div className='h-full  w-100%  text-[#a8b0d3] flex flex-col bg-[#052d43]'>
      <div className='flex-grow gap-3 items-center min-h-10  border-r-[2px] border-slate-300'>
        <div className='border-b-[1px] border-slate-300'>
          <CurrentProject/>

        </div>

       
        <div className='flex flex-col '>
          <div className='py-2'>
            <BoardView/>
          </div>
          <div className='border-red'>
            <WorkspaceView/>
          </div>
          <div>
            <YourBoards/>
          </div>
        </div>

      
      </div>
      <div className='px-2 py-2 border-r-[2px] border-t-[1px] border-slate-300'>
        {"Footer"}
      </div>
    </div>
  )
}

export default Sidebar