import React from 'react'
import Cards from '../card/card'

interface Props {
    name: string,
}

const Lists = ({name}: Props) => {
    return (
        <div className='relative text-black w-48 rounded min-h-80 border-solid border-2 border-foreground bg-[#f1f2f4] px-2  flex flex-col overflow-x-auto' style={{ minWidth: '272px', minHeight: '120px', maxHeight: '450px' }}>
            <div className='sticky top-0 left-0 bg-[#f1f2f4] items-center py-2 mt-0' style={{  width: '260px', height: '40px' }}>{name}</div>
            <div className='flex flex-col items-center py-2 gap-1'>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>
                <Cards name="1st card"/>

            </div>
        </div>
    )
}

export default Lists