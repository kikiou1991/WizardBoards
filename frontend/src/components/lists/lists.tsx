import React from 'react'

interface Props {
    name: string,
}

const Lists = ({name}: Props) => {
    return (
        <div className='text-black w-48 rounded min-h-80 border-solid border-2 border-foreground bg-[#f1f2f4] px-2 py-2 items-center' style={{ minWidth: '200px' }}>{name}</div>
    )
}

export default Lists