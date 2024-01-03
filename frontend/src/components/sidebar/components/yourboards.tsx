'use client';
import {Image} from '@nextui-org/react';
import MyModalNewBoard from '../sidebarmodal/new_board_modal';

const projects = [
  {
    id: 1,
    title: 'My Board One',
    image: 'https://media.istockphoto.com/id/1054271462/hu/fot%C3%B3/nyugat-felf%C3%B6ld-sk%C3%B3cia.jpg?s=2048x2048&w=is&k=20&c=2YbYUuA4OIKYfoo5jlcw7kAMOaIJDCq02vRXvO7LyH0=',
  },
  {
    id: 2,
    title: 'My Board Two',
    image: 'https://media.istockphoto.com/id/1219189856/hu/fot%C3%B3/a-feh%C3%A9r-bagoly.jpg?s=612x612&w=0&k=20&c=m4pJ5MqgGJc_PpzksE1kUz2FLf4xGGATX-BFyZfgSTw=',
  },
  {
    id: 3,
    title: 'My Board Three',
    image: 'https://cdn.pixabay.com/photo/2015/10/06/22/04/harry-potter-975362_1280.jpg',
  },
];

const YourBoards = () => {
  return (
    <div>
      <div className='flex flex-row px-2 pt-2'>
        <h2 className='font-semibold flex-grow'>Your Boards</h2>
        <MyModalNewBoard />
      </div>
      <div className='pt-2 flex flex-col'>
        {projects.map((project) => (
          <div key={project.id} title={project.title} className='px-2 py-1 flex flex-row items-center gap-2 hover:bg-primary'>
            <Image src={project.image} alt='something' width='34' height='34' radius='sm' />
            <div>{project.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourBoards;
