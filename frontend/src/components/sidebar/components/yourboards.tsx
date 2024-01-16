'use client';
import {UserContext, UserContextType} from '@/contexts/Usercontext';
import {useContext, useEffect, useState} from 'react';
import MyModalNewBoard from '../sidebarmodal/new_board_modal';

const YourBoards = () => {
  const {boards} = useContext(UserContext) as UserContextType;

  return (
    <div>
      <div className='flex flex-row px-2 pt-2'>
        <h2 className='font-semibold flex-grow'>Your Boards</h2>
        <MyModalNewBoard />
      </div>
      <div className='pt-2 flex flex-col'>
        {boards && boards.length > 0 ? (
          <ul className='pl-2 '>
          {boards.map((board: any) => {
              
              return <li className='py-1' key={board.uuid || board.id}>{board.name}</li>;
            })} 
           
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default YourBoards;
