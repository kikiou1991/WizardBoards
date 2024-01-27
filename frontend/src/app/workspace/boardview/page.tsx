'use client';
import { useContext, useEffect, useState } from 'react';

import { UserContext, UserContextType } from '@/contexts/Usercontext';

interface Workspace {
  uuid: string;
  name: string;
}

const BoardView = () => {
  const { boards } = useContext(UserContext) as UserContextType;

  return (
    <div className='grow overflow-hidden flex flex-col overflow-x-auto overflow-y-hidden  whitespace-nowrap'>
      {boards.length !== 0 ? (
        boards.map((board: any, index: number) => (
          <div key={index} className='text-foreground'>
            {board.name}
          </div>
        ))
      ) : (
        <div className='text-foreground'>{'Create Your First Board'}</div>
      )}
    </div>
  );
};

export default BoardView;
