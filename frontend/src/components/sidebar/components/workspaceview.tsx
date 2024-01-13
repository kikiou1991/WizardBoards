import Icon from '@/components/Icons';

const WorkspaceView = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='px-2'>
        <h2 className='font-semibold py-1 pr-0 ml-0'>Workspace View</h2>
      </div>
      <div className='h-8 gap-2 flex flex-row hover:bg-secondaryBG items-center px-2'>
        <div className='flex flex-row gap-2 flex-grow '>
          <Icon name='table' />
          <p className='italic '>Table</p>
        </div>
      </div>
      <div className='h-8 gap-2 flex flex-row hover:bg-secondaryBG items-center px-2'>
        <div className='flex flex-row gap-2 flex-grow '>
          <Icon name='calendar2' />
          <p className='italic'>Calendar</p>
        </div>
      </div>
    </div>
  );
};


export default WorkspaceView;
