'use client';
import MyModalNewBoard from '../sidebarmodal/new_board_modal';
import { useContext } from 'react';
import { UserContext, UserContextType } from '@/contexts/Usercontext';



interface Workspace {
  _id: string;
  name: string;
}


const YourBoards = () => {
  const {workspaces} = useContext(UserContext) as UserContextType
  return (
    <div>
      <div className='flex flex-row px-2 pt-2'>
        <h2 className='font-semibold flex-grow'>Your Boards</h2>
        <MyModalNewBoard />
      </div>
      <div className='pt-2 flex flex-col'>
      {/* {workspaces.map((workspace: Workspace) => (
          <div key={workspace._id} className='bg-[#041A42]'>
           
            <p>{workspace.name}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default YourBoards;
