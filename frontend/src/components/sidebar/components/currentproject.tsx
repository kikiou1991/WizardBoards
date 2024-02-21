'use client';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Button } from '@nextui-org/react';
import Icon from '@/components/Icons';
import { WorkspaceContext, WorkspaceContextType } from '@/contexts/WorkspaceContext';

const CurrentProject = () => {
  const {setSelectedWorkspace, selectedWorkspace, workspaces} = useContext(WorkspaceContext) as WorkspaceContextType;


  useEffect(() => {
    // Set the default selectedWorkspace to the UUID of the first workspace if available
    if (workspaces.length > 0) {
      setSelectedWorkspace(workspaces[0].uuid);
    }
  }, [workspaces]); // Run this effect whenever workspaces change

  return (
    <div className='flex flex-row py-2 px-3 gap-2 items-center cursor-pointer'>
      <div className='flex rounded-md w-[32px] h-[32px] font-bold text-xl p-2 items-center justify-center text-foreground bg-gradient-to-r from-sky-500 to-indigo-500'>
        {workspaces.find((w) => w.uuid === selectedWorkspace)?.name[0]}
      </div>
      <p className='flex-grow'>{workspaces.length > 0 && workspaces.find((w) => w.uuid === selectedWorkspace)?.name}</p>
    </div>
  );
};

export default CurrentProject;
