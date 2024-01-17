import React from 'react'

interface Props {
    name: string,
}

const Cards = ({name}: Props) => {
    return (
        <div className='text-black w-48 rounded min-h-80 border-solid border-2 border-foreground bg-[#304d89] px-2 py-2 items-center overflow-x-auto' style={{ minWidth: '232px', minHeight: '80px', }}>
            {name}
            
        </div>
    )
}

export default Cards