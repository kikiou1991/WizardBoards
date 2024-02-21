'use client';
import BoardNav from '@/components/board/boardnav';
import Lists from '@/components/lists/lists';
import { Button, Divider, Input, extendVariants, select } from '@nextui-org/react';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { start } from 'repl';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import Icon from '@/components/Icons';
import useOutsideClick from '@/components/customHooks/useOutsideClick';
import BoardView from '../boardview/page';

const Project = () => {
  const { lists, token, isBoardSelectedGlobal, cards } = useContext(UserContext) as UserContextType;
  const [isActive, setIsActive] = useState(true);
  const [listTitle, setListTitle] = useState('');

  const ref = useRef<HTMLDivElement | null>(null);

  const handleDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination, draggableId } = result;
    console.log('source: ', source);
    console.log('destination: ', destination);

    if (!destination) return;

    // Remove the "card-" prefix from draggableId and turn it into a number
    const cardUuid = parseInt(draggableId.replace('card-', ''));
    console.log('cardUuid: ', cardUuid);

    // Find the id of the starting list
    const startListId = source.droppableId;

    // Find the list that the card was dragged from
    const startList = lists.find((list) => list.uuid === startListId);

    // Find the id of the list that the card was dragged to
    const finishListId = destination.droppableId;

    // Find the list that the card was dragged to
    const finishList = lists.find((list) => list.uuid === finishListId);
    //filter the cards in the source list
    const filteredCards = cards.filter((card) => card.listUuid === startListId);
    //target the card object that we are dragging
    const cardToDrag = filteredCards.find((card) => card.cardIndex === cardUuid);
    console.log('cardToDrag: ', cardToDrag);
    // Handle item drag in same list or to another list
    if (startListId === finishListId) {
      console.log('Dragged within the same list');
    } else {
      console.log('Dragged to another list');
    }
  };

  const handleValueChange = (value: string) => {
    setListTitle(value);
  };

  const handleSubmitList = (token: any, listTitle: string) => {};

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setIsActive(false);
  }, []);

  //Custom hook to close the input field when clicking outside of it
  useOutsideClick(ref, toggleIsActive);

  return isBoardSelectedGlobal ? (
    <div className='relative grow  flex flex-col overflow-hidden '>
      <div className='relative w-full py-2 px-1 border-b-1 border-border items-center'>
        <BoardNav />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex w-full h-full overflow-x-auto items-start py-5 px-5 gap-5'>
          {lists.map((list: any) => (
            <Lists key={list.id} name={list.title} id={list.uuid} />
          ))}
          {isActive ? (
            <div
              ref={ref}
              className='relative text-black w-48 rounded min-h-80 border-solid border-2 border-foreground bg-secondaryBG px-1 flex flex-col overflow-y-auto overflow-x-hidden'
              style={{ minWidth: '272px', minHeight: '85px', maxHeight: '450px' }}>
              <Input
                value={listTitle}
                onValueChange={(newValue: string) => handleValueChange(newValue)}
                className='bg-blue text-black font-semibold pt-2 mb-2'
                placeholder='Enter a title for this list...'
                style={{
                  height: '40px',
                  padding: '5px',
                }}
                classNames={{
                  base: 'max-w-full sm:max-w-[24rem] h-10 items-center border-slate-200',
                  mainWrapper: 'flex h-full w-full justify-center  ',
                  input: 'text-small font-semibold group-data-[focus=true]:text-background',
                  inputWrapper:
                    'dark:focus-within:!bg-cards/70 data-[hover=true]:bg-cards h-full w-60  !cursor-text dark:focus-within:text-black bg-cards hover:bg-foreground border-slate-100 rounded-md',
                }}></Input>
              <div className='flex justify-start items-center px-2 py-1'>
                <Button onClick={() => handleSubmitList(token, listTitle)} color='primary' className='hover:bg-primary/90 text-white font-semibold'>
                  Create List
                </Button>
                <Button onClick={toggleIsActive} className='bg-inherit hover:bg-slate-200 text-black font-semibold' isIconOnly>
                  <Icon name='cancel' />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={toggleIsActive}
              startContent={<Icon name='addIcon' />}
              style={{ minWidth: '272px', minHeight: '45px', maxHeight: '450px' }}
              className='bg-transparent/20 flex justify-start'>
              <div>Create a new list...</div>
            </Button>
          )}
        </div>
      </DragDropContext>
    </div>
  ) : (
    <div>
      <BoardView />
    </div>
  );
};

export default Project;
