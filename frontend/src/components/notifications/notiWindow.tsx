import { Button, Switch } from '@nextui-org/react';
import React from 'react';
import Icon from '../Icons';
import Image from 'next/image';

const NotificationWindow = () => {
  return (
    <div
      className={`absolute bg-background text-foreground border-1 rounded-md top-16 right-0 `}
      style={{ maxHeight: '553px', minHeight: '400px', minWidth: '450px', display: 'flex', flexDirection: 'column' }}>
      <div className='flex flex-row items-center p-4 border-b-1'>
        <h2 className='flex-grow text-xl'>Notifications</h2>
        <div className='flex flex-row justify-end items-center gap-2'>
          <p className='text-sm italic'> Only show unread</p>
          <Switch defaultSelected color='success' size='sm'></Switch>
          <Button className='p-0 bg-inherit' size='sm' isIconOnly>
            <Icon name='threeDots' />
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center flex-grow gap-2' style={{ minHeight: 'calc(100% - 3rem)' }}>
        <Image className='bg-inherit' src='https://trello.com/assets/ee2660df9335718b1a80.svg' width={150} height={150} alt='harry-potter' />
        <div>No Notifications to display</div>
      </div>
    </div>
  );
};

export default NotificationWindow;
