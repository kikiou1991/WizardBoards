'use client';
import MyModalNewBoard from '../sidebarmodal/new_board_modal';
import { useContext, useEffect, useState } from 'react';
import { UserContext, UserContextType } from '@/contexts/Usercontext';

const YourBoards = () => {
  const { boards} = useContext(UserContext) as UserContextType;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set isLoading to false when boards are available
    if (boards && boards.length > 0) {
      setIsLoading(false);
    }
  }, [boards]);


  return (
    <div>
      <div className='flex flex-row px-2 pt-2'>
        <h2 className='font-semibold flex-grow'>Your Boards</h2>
        <MyModalNewBoard />
      </div>
      <div className='pt-2 flex flex-col'>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul>
              {boards.map((board: any) => (
                <li key={board.uuid || board._id}>{board.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourBoards;

