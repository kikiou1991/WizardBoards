import React from 'react'
import {  Draggable, Droppable, DropResult, } from '@hello-pangea/dnd';

interface Props {
    name: string,
    index: number,
}

const Cards = ({name, index}: Props) => {
    return (
        <Draggable draggableId={`card-${index}`} index={index}>
        {(provided) => (
            <div 
                className='text-black w-60 rounded  border-solid border-2 border-slate-100 bg-cards px-2 py-2 items-center overflow-x-hidden text-wrap'
                style={{ minWidth: '242px', minHeight: '80px', }}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}    
            >
            {name}
            
            </div>

        )}
        </Draggable>
    )
}

export default Cards