import Icon from '@/components/Icons'
import React from 'react'

const WorkspaceView = () => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='px-2'>
            <h2 className='font-semibold py-1 pr-0 ml-0'>Workspace View</h2>
        </div>
        <div className='h-8 gap-2 flex flex-row hover:bg-[#602ee4] items-center px-2'>
            <Icon name="table"/>
            <p className='italic'>Table</p>
        </div>
        <div className='h-8 gap-2 flex flex-row hover:bg-[#602ee4] items-center px-2'>
            <Icon name="calendar2"/>
            <p className='italic'>Calendar</p>
        </div>
    </div>
  )
}

export default WorkspaceView