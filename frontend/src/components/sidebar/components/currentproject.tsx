"use client"
import React, { useState, useEffect, useContext } from 'react';
import { UserContext, UserContextType } from '@/contexts/Usercontext';
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Button} from '@nextui-org/react';
import Icon from '@/components/Icons';

const CurrentProject = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const { workspaces, fetchWorkspaces, setWorkspace, token } = useContext(
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
      <div className='items-center'>
        <Dropdown className='bg-background text-[#E5EAF3]' placement='bottom-start'>
          <DropdownTrigger>
            <Button className='bg-inherit hover:bg-secondaryBG' size='sm' isIconOnly>
              <Icon name='downarrow' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {workspaces.map((workspace: any) => (
              <DropdownItem
                key={workspace.uuid}
                onClick={() => {
                  handleWorkspaceChange(workspace.uuid);
                }}
              >
                {workspace.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default CurrentProject;
