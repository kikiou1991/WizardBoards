import BoardNav from '@/components/board/boardnav';
import Lists from '@/components/lists/lists';
import {Divider} from '@nextui-org/react';

const Project = () => {
  return (
    <div className='grow bg-background flex flex-col'>
      <div className='w-full py-2 border-b-1 items-center'>
        <BoardNav/>
      </div>
      <div className='w-full py-5 px-5 items-center ml-2 flex flex-row gap-5 flex-shrink-0 '>
        <Lists name="To Do"/>
        <Lists name="In Progress"/>
        <Lists name="Completed"/>
        <Lists name="Reviewed"/>
        

      </div>
      
    </div>
  );
};

export default Project;
