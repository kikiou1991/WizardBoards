import BoardNav from '@/components/board/boardnav';
import Lists from '@/components/lists/lists';
import {Divider} from '@nextui-org/react';

const Project = () => {
  return (
    <div className='grow bg-background flex flex-col'>
      <div className='w-full py-2 border-b-2 items-center'>
        <BoardNav/>
      </div>
      <div className='w-full py-2 items-center ml-2'>
        <Lists/>

      </div>
      
    </div>
  );
};

export default Project;
