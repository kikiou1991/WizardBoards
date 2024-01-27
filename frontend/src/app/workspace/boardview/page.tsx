'use client';
import { useContext, useEffect, useState } from 'react';
import { workspaceBoards } from '@/lib/boards';
import { userWorkspaces } from '@/lib/workspaces';
import { UserContext, UserContextType } from '@/contexts/Usercontext';

interface Workspace {
  uuid: string;
  name: string;
}

const BoardView = () => {
  const { selectedWorkspace, boards } = useContext(UserContext) as UserContextType;
  // const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  // const [boards, setBoards] = useState<any[]>([]);

  // const fetchWorkspaces = async (token: any) => {
  //   if (!token) {
  //     console.log('Token is missing');
  //   }

  //   try {
  //     let res = await userWorkspaces.fetchWorkspaces(token);

  //     setWorkspaces(res?.data || []);
  //   } catch (error: any) {
  //     // Handle error if needed
  //     console.error('Error fetching workspaces:', error || error.message || error.response);
  //   }
  // };

  // const fetchBoard = async (token: any, workspaceUuid: string) => {
  //   try {
  //     const res = await workspaceBoards.fetchBoard(token, workspaceUuid);
  //     setBoards(res?.data || []);
  //   } catch (error) {
  //     console.error('Failed to fetch boards', error);
  //   }
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   fetchWorkspaces(token);
  // }, [selectedWorkspace]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (workspaces.length !== 0) {
  //     // Iterate over each workspace and fetch its boards
  //     workspaces.forEach(async (workspace) => {
  //       await fetchBoard(token, workspace.uuid);
  //     });
  //   }
  // }, [workspaces]);

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
