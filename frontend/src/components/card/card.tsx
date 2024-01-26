import React from 'react';
import { Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import Icon from '../Icons';

interface Props {
  name: string;
  index: number;
}

const Cards = ({ name, index }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const onMouseOver = () => setIsHovered(true);
  const onMouseLeve = () => setIsHovered(false);

  return (
    <Draggable draggableId={`card-${index}`} index={index}>
      {(provided) => (
        <div
          className='text-black w-60 rounded  border-solid border-2 border-slate-300 bg-cards px-2 py-2 items-center overflow-x-hidden text-wrap flex relative'
          style={{ minWidth: '242px', minHeight: '80px' }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <div style={{ marginRight: '24px' }}>{name}</div>
          <Popover
            className=''
            showArrow
            backdrop='opaque'
            placement='right'
            classNames={{
              base: [
                // arrow color
                'before:bg-cards',
              ],
              content: ['py-3 px-4 border border-slate-300', 'bg-cards', 'dark:from-default-100 dark:to-default-50'],
            }}>
            <PopoverTrigger className={`absolute right-0 top-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Button size='sm' endContent={<Icon name='edit' />} isIconOnly className='bg-inherit hover:bg-[#dadada] rounded-full'></Button>
            </PopoverTrigger>
            <PopoverContent className=''>
              {(titleProps) => (
                <div className='items-center'>
                  <div className=' bg-cards items-center rounded-lg  hover:bg-slate-300'>
                    <Button startContent={<Icon name='editCard' />} className='text-black font-bold bg-inherit'>
                      Edit Card
                    </Button>
                  </div>
                  <div className='bg-cards items-center rounded-lg hover:bg-slate-300'>
                    <Button startContent={<Icon name='archive' />} className='text-black font-bold bg-inherit'>
                      Delete Card
                    </Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      )}
    </Draggable>
  );
};

export default Cards;
