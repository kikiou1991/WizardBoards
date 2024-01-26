"use client"
import BoardNav from '@/components/board/boardnav';
import Lists from '@/components/lists/lists';
import { Button, Divider, Input } from '@nextui-org/react';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { start } from 'repl';
import { useContext, useState } from 'react';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import Icon from '@/components/Icons';


const Project = () => {
  const {lists, token} = useContext(UserContext) as UserContextType;
  const [isActive, setIsActive] = useState(true);
  const [listTitle, setListTitle] = useState('')
  //Get all the relevent information from the backend

  // const handleDragEnd = (result: DropResult) => {
  //   //Extract the relevent information from the result
  //   const { source, destination, type } = result;
    

  //   //If the card is dropped outside of a list, return
  //   if(!result.destination) return;

  //       // Handle list dragging 
  //       if(type === 'list') {
  //         //create an array of all coloumn entiries
  //         const entries = //get all the entries from the backend

  //         //Remove the dragged list from the source

  //         const [removed] = entries.splice(source.index, 1);

  //         //Insert the column into the destination

  //         entries.splice(destination.index, 0, removed);

  //         //Create a new Map with the rearranged lists

  //         const rearrangedLists = new Map(entries);
  //       }


  //       //Handle card dragging
  //         const lists = Array.from(board.lists);
  //         const startListIndex = lists[Number(source.droppableId)];
  //         const finishListIndex = lists[Number(destination.droppableId)];

  //         //Create list objects from the source and destination

  //         const startList = {
  //           id: startListIndex[0],
  //           todos: startColIndex[1]
  //         };

  //         const finishList = {
  //           id: finishColIndex[0],
  //           todos: finishColIndex[1]
  //         };


  //         //Check if the soure or destination is missing
  //         if(!startList || !finishList) return;

  //         //check if the card was dropped in the same position in the same list
  //         if(startList === finishList && source.index === destination.index) return;

  //         //Create a copy of the todos in the soruce list
  //         const newTodos = [...startList.todos];

  //         //Remove the card from the source list
  //         const [todoMoved] = newTodos.splice(source.index, 1);

  //         //Handle the case where the card is dragged within the same list
          
  //         if(startList.id === finishList.id) {
  //           //Reorder the todos in the same list
  //           newTodos.splice(destination.index, 0, todoMoved);

  //           //Create a new list onject with the updated todos
  //           const newList = {
  //             id: startList.id,
  //             todos: newTodos
  //           }

  //           //Create a new Map with the updated lists
  //             const newLists = new Map(board.lists);
  //             newLists.set(newList.id, newList);

  //           //Update the board state with the rearranged lists
  //           setBoardState({
  //             ...board,
  //             lists: newLists
  //           });
  //         } else {
  //           //Handle the case where card is dragged to another list

  //           const finishedTodos = [...finishList.todos];

  //           //Insert the card in to the destination list
  //           finishedTodos.splice(destination.index, 0, todoMoved);

  //           //Create a new copy of the list map

  //           const newLists = new Map(board.lists);

  //           //create new list object with the updated todos for the soure list

  //           const newList = {
  //             id: startList.id,
  //             todos: newTodos
  //           }
  //             //update the source list in the map

  //             newLists.set(newList.id, newList);

  //             //Create a new list object for the destination list with the updated todos

  //             newLists.set(finishList.id, { 
  //               id: finishList.id,
  //               todos: finishedTodos
  //             });

  //             //Update the board state with the rearranged lists
  //             setBoardState({...board, lists: newLists});

  //             //Update the backend with the rearranged lists(in the the DB)
  //             updateTodoInDb(todoMoved, finishList.id);
  //         }







          
   
  //   }
    const handleDragEnd = (result: DropResult) => { 
        console.log(result);
    }

    const handleValueChange = ( value: string) => {
      setListTitle(value);
      
    }

    const handleSubmitList = ( token: any, listTitle: string) => {

    }

    const toggleIsActive = () => {
      setIsActive(!isActive)
    }
  

  return (
    <div className='relative grow bg-background flex flex-col overflow-hidden mr-5'>
        <div className='relative w-full py-2 px-1 border-b-1 items-center'>
          <BoardNav />
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex w-full h-full overflow-x-auto items-start py-5 px-5  gap-5 mr-5'>
          {lists.map((list: any) => (
            <Lists key={list.id} name={list.title} id={list.uuid}/>
          ))}
          
          {
            isActive ? (
              <div className='relative text-black w-48  rounded min-h-80 border-solid border-2 border-foreground bg-[#dadada] px-1  flex flex-col overflow-y-auto overflow-x-hidden' style={{ minWidth: '272px', minHeight: '85px', maxHeight: '450px' }}>
                  <Input 
                    value={listTitle}
                    onValueChange={(newValue: string) => handleValueChange(newValue)}
                    className='bg-blue text-black  font-semibold pt-2 mb-2'
                    placeholder='Enter a title for this card...'
                    style={{
                      height: '40px',
                      padding: '5px',
                      
                    }}
                    classNames={{
                      base: 'max-w-full sm:max-w-[24rem] h-10 items-center border-slate-200',
                      mainWrapper: 'flex h-full w-full  justify-center  ',
                      input: 'text-small text-black ',
                      inputWrapper: 'dark:focus-within:!bg-cards/50 data-[hover=true]:bg-cards h-full w-60  !cursor-text dark:focus-within:text-forground bg-cards hover:bg-foreground border-slate-100 rounded-md',
                    }}
                  ></Input>
                  <div className='flex justify-start items-center px-2 py-1'>
                      <Button onClick={() => handleSubmitList(token, listTitle)}  color='primary' className='hover:bg-primary/90 text-white font-semibold'>Add Card</Button>
                      <Button onClick={toggleIsActive}   className='bg-inherit hover:bg-slate-200 text-black font-semibold' isIconOnly><Icon name='cancel'/></Button>
                  </div>
              </div>
            ) : (
              <Button onClick={toggleIsActive} startContent={<Icon name="addIcon" />}style={{ minWidth: '272px', minHeight: '45px', maxHeight: '450px' }} className='bg-transparent/20 flex justify-start'>
                <div>Create a new list...</div>
              </Button>
            )
          }
        
        </div>
        </DragDropContext>
      </div>

  );
};

export default Project;
