"use client"
import BoardNav from '@/components/board/boardnav';
import Lists from '@/components/lists/lists';
import { Divider } from '@nextui-org/react';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { start } from 'repl';
import { useContext } from 'react';
import { UserContext, UserContextType } from '@/contexts/Usercontext';


const Project = () => {
  const {lists} = useContext(UserContext) as UserContextType;
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
  

  return (
    <div className='relative grow bg-background flex flex-col overflow-auto'>
        <div className='relative w-full py-2 px-1 border-b-1 items-center'>
          <BoardNav />
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex w-full h-full overflow-x-auto items-start py-5 px-5  gap-5'>
          {lists.map((list: any) => (
            <Lists key={list.id} name={list.title} id={list.uuid}/>
          ))}
          
          
        </div>
        </DragDropContext>
      </div>

  );
};

export default Project;
