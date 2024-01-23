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

  // Rando card index generator for later
//   const generateCardIndex = () => {
//     const timestamp = new Date().getTime();
//     const random = Math.floor(Math.random() * 10); // You can adjust the range as needed
//     return `${timestamp}${random}`;
//   };
//   const cardIndex = generateCardIndex();
//   console.log('This is the cardIndex: ', cardIndex);
  




  return (
    <div className='relative text-black w-48 rounded min-h-80 border-solid border-2 border-foreground bg-[#f1f2f4] px-2  flex flex-col overflow-x-auto' style={{ minWidth: '272px', minHeight: '120px', maxHeight: '450px' }}>
      <div className='sticky top-0 left-0 bg-[#f1f2f4] items-start py-2 mt-0' style={{ width: '260px', height: '40px' }}>
        {name}
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className=' flex flex-col items-center py-2 gap-1'>
            {cards.map((card: any, index: number) => (
              <Cards key={card.uuid} name={card.title} index={5} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Lists;
