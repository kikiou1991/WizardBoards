'use client';
import { useEffect, useState } from 'react';
import { workspaceBoards } from '@/lib/boards';
import { userWorkspaces } from '@/lib/workspaces';

const BoardView = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [boards, setBoards] = useState<any[]>([]);

  const fetchWorkspaces = async (token: any) => {
    if (!token) {
      console.log('Token is missing');
    }

    try {
      let res = await userWorkspaces.fetchWorkspaces(token);

      setWorkspaces(res?.data || []);
    } catch (error: any) {
      // Handle error if needed
      console.error('Error fetching workspaces:', error || error.message || error.response);
    }
  };
  const fetchBoard = async (token: any, workspaceUuid: string) => {
    try {
      const res = await workspaceBoards.fetchBoard(token, workspaceUuid);
      setBoards(res?.data || []);
    } catch (error) {
      console.error('Failed to fetch boards', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchWorkspaces(token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (workspaces.length !== 0) {
      fetchBoard(token, workspaces[0].uuid);
    }
  }, [workspaces]);

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
