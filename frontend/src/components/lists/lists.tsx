import React, { useContext, useState } from 'react';
import Cards from '../card/card';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import { Button, Input } from '@nextui-org/react';
import Icon from '../Icons';

interface Props {
  name: string;
  id: string;
}

const Lists = ({ name, id }: Props) => {
  const { lists, cards, createCard, token } = useContext(UserContext) as UserContextType;
  const [inputFieldRendered, setInputFieldRendered] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const toggleInput = () => {
    setInputFieldRendered(!inputFieldRendered);
  };

  const handleValueChange = (value: string) => {
    setCardTitle(value);
  };

  const handleSubmitCard = (token: any, cardTitle: string) => {
    if (cardTitle === '') {
      // Handle empty title
      return;
    }

    try {
      createCard(token, { title: cardTitle }, id);
      setCardTitle('');
      toggleInput(); // Close the input field after submitting
    } catch (error) {
      console.error('Failed to submit card', error);
      // Handle error if needed
    }
  };

  // Filter cards based on the current list ID
  const filteredCards = cards.filter((card) => card.listUuid === id);

  return (
    <div
      className='relative text-black w-48 rounded min-h-80 border-solid border-2 border-foreground bg-[#dadada] px-2  flex flex-col overflow-y-auto overflow-x-hidden'
      style={{ minWidth: '272px', minHeight: '120px', maxHeight: '450px' }}>
      <div className='sticky w-48 top-0 left-0 bg-inherit items-center justify-center py-2 px-2 overflow-y-auto' style={{ width: '260px', height: '40px' }}>
        {name}
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className='relative flex flex-col items-center h-full  py-2 gap-1 px-1'>
            {filteredCards.map((card: any) => (
              <Cards key={card.uuid} name={card.title} index={card.cardIndex} />
            ))}
            {inputFieldRendered && (
              <Input
                value={cardTitle}
                onValueChange={(newValue: string) => handleValueChange(newValue)}
                className='bg-blue text-black  font-semibold'
                placeholder='Enter a title for this card...'
                style={{
                  height: '40px',
                  padding: '5px',
                }}
                classNames={{
                  base: 'max-w-full sm:max-w-[24rem] h-10 items-center border-slate-200',
                  mainWrapper: 'flex h-full w-full  justify-center  ',
                  input: 'text-small group-data-[focus=true]:text-black ',
                  inputWrapper:
                    'dark:focus-within:!bg-cards/60 data-[hover=true]:bg-cards h-full w-60  !cursor-text dark:focus-within:text-forground bg-cards hover:bg-foreground border-slate-100 rounded-md',
                }}
              />
            )}
          </div>
        )}
      </Droppable>
      <div className='sticky bottom-0 left-0  bg-inherit w-64 m-auto pb-2 '>
        {inputFieldRendered ? (
          <div className='flex justify-start items-center px-2 py-1'>
            <Button onClick={() => handleSubmitCard(token, cardTitle)} color='primary' className='hover:bg-primary/90 text-white font-semibold'>
              Add Card
            </Button>
            <Button onClick={toggleInput} className='bg-inherit hover:bg-slate-200 text-black font-semibold' isIconOnly>
              <Icon name='cancel' />
            </Button>
          </div>
        ) : (
          <div className='flex justify-start items-center'>
            <Button color='primary' onClick={toggleInput} startContent={<Icon name='addIcon' />} className='bg-transparent hover:bg-cards text-black font-semibold'>
              Add Card
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
