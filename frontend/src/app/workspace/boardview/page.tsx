import Project from '../projects/page';
const BoardView = () => {
  return (
    <div className='grow overflow-hidden flex flex-col overflow-x-auto overflow-y-hidden  whitespace-nowrap'>
      <Project />
    </div>
  );
};

export default BoardView;
