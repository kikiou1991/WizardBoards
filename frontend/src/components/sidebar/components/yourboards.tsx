'use client';
import MyModalNewBoard from '../sidebarmodal/new_board_modal';
import { useContext, useEffect} from 'react';
import { UserContext, UserContextType } from '@/contexts/Usercontext';

const YourBoards = () => {
  const { boards, fetchBoard, token, currentWorkspace } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    // Fetch boards when the currentWorkspace changes
    if (currentWorkspace && token) {
      fetchBoard(token, currentWorkspace.uuid);
    }
  }, [token, currentWorkspace]);


  return (
    <div>
      <div className='flex flex-row px-2 pt-2'>
        <h2 className='font-semibold flex-grow'>Your Boards</h2>
        <MyModalNewBoard />
      </div>
      <div className='pt-2 flex flex-col'>
        {currentWorkspace && (
          <div>
            <ul>
              {boards.map((board: any) => (
                <li key={board.uuid || board._id} >{board.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourBoards;
