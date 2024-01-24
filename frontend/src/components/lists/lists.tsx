import React, { useContext } from 'react';
import Cards from '../card/card';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { UserContext, UserContextType } from '@/contexts/Usercontext';

interface Props {
  name: string;
  id: string;
}

const Lists = ({ name, id }: Props) => {
  const { lists, cards } = useContext(UserContext) as UserContextType;

  // Filter cards based on the current list ID
  const filteredCards = cards.filter((card) => card.listUuid === id);

  return (
    <div className='relative text-black w-48 rounded min-h-80 border-solid border-2 border-foreground bg-[#f1f2f4] px-2  flex flex-col overflow-x-auto' style={{ minWidth: '272px', minHeight: '120px', maxHeight: '450px' }}>
      <div className='sticky top-0 left-0 bg-[#f1f2f4] items-start py-2 mt-0 ' style={{ width: '260px', height: '40px' }}>
        {name}
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className=' flex flex-col items-center py-2 gap-1'>
            {filteredCards.map((card: any) => (
              <Cards key={card.uuid} name={card.title} index={card.cardIndex} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Lists;
