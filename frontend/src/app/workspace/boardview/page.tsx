"use client";
import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  CardFooter,
  Spinner,
} from "@nextui-org/react";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import Link from "next/link";
import MyModalEmail from "@/components/sidebar/sidebarmodal/newmember_modal";
import { BoardContext, BoardContextType } from "@/contexts/BoardContext";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import WorkspaceHeader from "@/components/workspaceHeader";
import { useRouter } from "next/navigation";

interface Workspace {
  uuid: string;
  name: string;
}

const BoardView = () => {
  const { selectedWorkspace, workspaces } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const { boards, setSelectedBoard, setIsBoardSelectedGlobal, boardsLoading} = useContext(
    BoardContext
  ) as BoardContextType;
  const selectedWorkspaceName = workspaces.find(
    (workspace: Workspace) => workspace.uuid === selectedWorkspace
  )?.name;
  const initial = workspaces.find(
    (workspace: Workspace) => workspace.uuid === selectedWorkspace
  )?.name[0];
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const router = useRouter();
  const handleBoardChange = (boardId: string) => {
    setSelectedBoard(boardId);
    setIsBoardSelectedGlobal(true);
    setSelectedItemId(boardId);

    router.push(`/workspace/projects?board=${boardId}`);
  };


  
  return (
    <div className="flex flex-col flex-wrap overflow-x-hidden overflow-y-auto p-3 gap-2 ">
    {boardsLoading ? (
        <div className="grow flex items-center justify-center w-full h-full flex-col gap-6">
          <Spinner size="lg" color="primary" />
          <p className="font-bold">Boards loading... </p>
          </div>

    ) : (<>
    <WorkspaceHeader />
      <div className="px-2 text-2xl font-bold text-foreground">
        <h2 className="">Boards</h2>
      </div>
      <div className="flex flex-row flex-wrap overflow-x-hidden overflow-y-auto p-3 gap-2 ">
        {boards.length !== 0 ? (
          boards.map((board: any, index: number) => (
            <div
              key={index}
              className="text-foreground flex flex-grow-0 px-2"
              onClick={() => handleBoardChange(board.uuid)}
            >
              <Link href="/workspace/projects">
                <Card className="col-span-12 sm:col-span-4 w-[220px] h-[200px]">
                  <CardHeader className="absolute bg-foreground z-10 top-0 flex-col !items-start">
                    <h4 className="text-black font-bold text-large flex text-wrap">
                      {board.name}
                    </h4>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src={board.imageLink}
                  />
                </Card>
              </Link>
              <div className="flex flex-grow"></div>
            </div>
          ))
        ) : (
          <div className="text-foreground">{"Create Your First Board"}</div>
        )}
      </div>
    </>
    )}
      
    </div>
  );
};

export default BoardView;
