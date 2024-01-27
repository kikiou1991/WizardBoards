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
  const { boards } = useContext(UserContext) as UserContextType;

  return (
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
  );
};

export default BoardView;
