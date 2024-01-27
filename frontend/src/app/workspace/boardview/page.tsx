'use client';
import { useContext, useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Image, Button, CardFooter } from '@nextui-org/react';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import Link from 'next/link';

interface Workspace {
  uuid: string;
  name: string;
}

const BoardView = () => {
  const { boards, selectedWorkspace, workspaces } = useContext(UserContext) as UserContextType;

  //get the selected workspace so we can access the name property of it

  const selectedWorkspaceName = workspaces.find((workspace: Workspace) => workspace.uuid === selectedWorkspace)?.name;
  const initial = workspaces.find((workspace: Workspace) => workspace.uuid === selectedWorkspace)?.name[0];

  return (
    <div className='flex flex-col flex-wrap overflow-x-hidden overflow-y-auto p-3 gap-2 '>
      <div className='flex flex-row gap-2 items-center justify-center border-b-1 py-4'>
        <div className='flex rounded-md w-[45px] h-[45px] font-bold text-3xl text-white p-2 items-center justify-center  bg-gradient-to-r from-sky-500 to-indigo-500'>{initial}</div>
        <h2>{selectedWorkspaceName}</h2>
      </div>
      <div className='px-2 text-2xl font-bold text-foreground'>
        <h2 className=''>Boards</h2>
      </div>
      <div className='flex flex-row flex-wrap overflow-x-hidden overflow-y-auto p-3 gap-2 '>
        {boards.length !== 0 ? (
          boards.map((board: any, index: number) => (
            <div key={index} className='text-foreground flex flex-grow-0 px-2'>
              <Link href='/workspace/projects'>
                <Card className='col-span-12 sm:col-span-4 w-[220px] h-[200px]'>
                  <CardHeader className='absolute z-10 top-1 flex-col !items-start'>
                    <p className='text-tiny text-black/60 uppercase font-bold'>Supercharged</p>
                    <h4 className='text-black font-bold text-large flex text-wrap'>{board.name}</h4>
                  </CardHeader>
                  <Image removeWrapper alt='Card background' className='z-0 w-full h-full object-cover' src={board.imageLink} />
                </Card>
              </Link>
              <div className='flex flex-grow'></div>
            </div>
          ))
        ) : (
          <div className='text-foreground'>{'Create Your First Board'}</div>
        )}
      </div>
    </div>
  );
};

export default BoardView;
