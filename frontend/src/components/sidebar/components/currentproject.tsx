"use client"
import React, { useState, useEffect, useContext } from 'react';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Button} from '@nextui-org/react';
import Icon from '@/components/Icons';

const CurrentProject = () => {
  
  const { workspaces, fetchWorkspaces, setWorkspace, token, selectedWorkspace, setSelectedWorkspace } = useContext(
    UserContext
  ) as UserContextType;

  useEffect(() => {
    fetchWorkspaces(token); // Fetch workspaces when the component mounts
  }, [token]);

  useEffect(() => {
    // Set the default selectedWorkspace to the UUID of the first workspace if available
    if (workspaces.length > 0) {
      setSelectedWorkspace(workspaces[0].uuid);
    }
  }, [workspaces]); // Run this effect whenever workspaces change

  const handleWorkspaceChange = (workspaceId: string) => {
    setSelectedWorkspace(workspaceId);
    const selectedWorkspaceObject = workspaces.find((workspace) => workspace.uuid === workspaceId);
    setWorkspace(selectedWorkspaceObject || null); // Update the current workspace in the context
  };

  return (
    <div className='flex flex-row py-2 px-3 items-center '>
      <p className='flex-grow'>{workspaces.length > 0 && workspaces.find((w) => w.uuid === selectedWorkspace)?.name}</p>
      
    </div>
  );
};

export default CurrentProject;
