import Icon from "@/components/Icons";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { Button, Image, Input } from "@nextui-org/react";
import { useContext, useState, useRef } from "react";

interface Workspace {
  ref: React.RefObject<HTMLElement>;
}

const WorkspaceModal = ({ ref }: Workspace) => {
  const [workSpaceTitle, setWorkSpaceTitle] = useState("");
  const context = useContext(UserContext);
  const { createWorkspace } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const handleCreateWorkspace = async () => {
    if (!workSpaceTitle) {
      return;
    }
    try {
      await createWorkspace(context?.token, { name: workSpaceTitle });
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  return (
    <div
      className={`absolute w-full inset-0 rounded-lg flex flex-row bg-background text-foreground px-5 py-2 items-center`}
      style={{
        maxHeight: "400px",
        maxWidth: "800px",
        minHeight: "400px",
        minWidth: "350px",
      }}
    >
      <div className=" flex flex-col gap-2 w-1/2 items-left">
        <h1>Let`s build a Workspace</h1>
        <h2>
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </h2>
        <Input
          type="email"
          label="Workspace name"
          labelPlacement="outside"
          placeholder="Hufflepuff"
          description="This is the name of your company, team, or organization."
          className="py-2 gap-1"
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full ",
            input: "text-small",
            inputWrapper:
              "data-[hover=true]:bg-none h-full font-normal text-[#090607] bg-secondaryBG hover:bg-primary",
          }}
          value={workSpaceTitle}
          onChange={(e) => setWorkSpaceTitle(e.target.value)}
        />

        <div className="pt-7 items-center align-center max-w-full">
          <Button
            onPress={handleCreateWorkspace}
            size="md"
            color="primary"
            isDisabled={false}
          >
            Create
          </Button>
        </div>
      </div>
      <div className="border-y-[#143f88] image w-1/2 ">
        <Image
          className="py-4 px-2 rounded-lg"
          alt="badger"
          width={400}
          height={400}
          src="https://cdn.pixabay.com/photo/2015/10/06/22/04/harry-potter-975362_1280.jpg"
          style={{ minWidth: "400px", minHeight: "350px" }}
        />
      </div>
    </div>
  );
};

export default WorkspaceModal;
