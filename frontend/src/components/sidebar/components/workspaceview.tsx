import Icon from '@/components/Icons';
import {Divider} from '@nextui-org/react';
import Link from 'next/link';
const WorkspaceView = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Divider className='mt-2' />
      <div className='px-2'>
        <h2 className='font-semibold py-1 pr-0 ml-0'>Workspace View</h2>
      </div>
      <div className='h-8 gap-2 flex flex-row hover:bg-secondaryBG items-center px-2'>
        <div className='flex flex-row gap-2 flex-grow cursor-pointer'>
          <Icon name='table' />
          <Link href='/workspace/table' className=' '>
            Table
          </Link>
        </div>
      </div>
      <div className='h-8 gap-2 flex flex-row hover:bg-secondaryBG items-center px-2'>
        <div className='flex flex-row gap-2 flex-grow cursor-pointer'>
          <Icon name='calendar2' />
          <Link href='/workspace/calendar' className=''>
            Calendar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceView;
