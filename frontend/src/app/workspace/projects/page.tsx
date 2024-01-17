import BoardNav from '@/components/board/boardnav';
import Lists from '@/components/lists/lists';
import { Divider } from '@nextui-org/react';

const Project = () => {
  return (
    <div className='relative grow bg-background flex flex-col overflow-auto'>
      <div className='relative w-full py-2 border-b-1 items-center'>
        <BoardNav />
      </div>
      <div className='flex w-full h-full overflow-x-auto items-center py-5 px-5  gap-5'>
        <Lists name='To Do' />
        <Lists name='In Progress' />
        <Lists name='Completed' />
        <Lists name='Reviewed' />
        <Lists name='Reviewed' />
        <Lists name='Reviewed' />
        <Lists name='Reviewed' />
      </div>
    </div>
  );
};

export default Project;
