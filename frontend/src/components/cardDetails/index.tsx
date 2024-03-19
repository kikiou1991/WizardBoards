import { Avatar, AvatarGroup, Button, Input } from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Icon from "../Icons";
import Comment from "../comment";
import PopUpWrapper from "../CustomPopUp/Wrapper";
import PopUpBody from "../CustomPopUp/Body";
import UserCard from "../usercard";
import { UserContext, UserContextType } from "@/contexts/Usercontext";
import { userList } from "@/lib/v2/users";
import {
  WorkspaceContext,
  WorkspaceContextType,
} from "@/contexts/WorkspaceContext";
import { User } from "@/types";
import { CardContext, CardContextType } from "@/contexts/CardContext";
import TextArea from "../textareainput";
import { listCards } from "@/lib/v2/cards";
import projectConfig from "../projectConfig";
import { Socket, io } from "socket.io-client";
// import TextArea from '@atlaskit/textarea';

//This board will depend on the data from the backend, when a card is clicked it will show the details of the card
//We get the right card by its id
interface CardDetailProps {
  title: string;
  members?: string[];
  description?: string;
  isHidden?: boolean;
  setIsHidden: (value: boolean) => void;
  uuid: string;
}

const CardDetails = ({
  title,
  description,
  isHidden,
  setIsHidden,
  uuid,
}: CardDetailProps) => {
  //state and context imports
  const { user, token } = useContext(UserContext) as UserContextType;
  const { cards, deleteCard } = useContext(CardContext) as CardContextType;
  const { selectedWorkspace, workspaces } = useContext(
    WorkspaceContext
  ) as WorkspaceContextType;
  const [isMemberVisible, setIsMemberVisible] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([] as any);

  //Get the selected card from the cards array so we can render the relevant data
  let selectedCard = cards.find((card) => card.uuid === uuid);

  //we want to find all the users who are currently memebers of the card
  const members = selectedCard?.members;
  //next we need to find the details of the members

  //we got current users from the workspace
  //we will filter the current users to find the members of the card
  const currentMembersData = currentUsers?.filter((user: any) =>
    members?.includes(user.uuid)
  );

  //we need a new array of user objects where we dont want to include the members of the card
  //we will use this array to render the usercards in the pop up
  const nonMembers = currentUsers?.filter((user: User) => {
    return !members?.includes(user.uuid);
  });
  //Functions
  const closeModal = () => {
    setIsHidden(true);
  };
  //Fetch the users from the workspace
  const workspaceId = workspaces.find(
    (workspace) => workspace.uuid === selectedWorkspace
  )?._id;
  const fetchUsers = async (token: any) => {
    try {
      let res = await userList.getWorkspaceMembers(token, workspaceId);
      //if one of the users is a member of this card alreadt we dont want to add it to the array
      setCurrentUsers(res?.users.data);
    } catch (error: unknown) {
      console.error("Error while trying to fetch users: ", error);
    }
  };
  useEffect(() => {
    fetchUsers(token);
  }, [token, workspaceId]);

  const closeAddMember = () => {
    setIsMemberVisible(false);
  };
  const handleAddUser = (user: User) => {
    if (selectedCard) {
      listCards.cardMemberUpdate(token, selectedCard.uuid, user.uuid, "add");
    }
    // setCurrentMembersData([...currentMembersData, user]);
  };

  const removeMember = (user: User) => {
    const updatedMembers = currentMembersData.filter(
      (u: User) => u.uuid !== user.uuid
    );
    if (selectedCard) {
      selectedCard.members = updatedMembers;
      listCards.cardMemberUpdate(token, selectedCard.uuid, user.uuid, "remove");
    }
    // setCurrentMembers(updatedMembers);
    // setCurrentUsers([...currentUsers, user]);
  };
  const handleDeleteCard = async () => {
    try {
      const cardToDelete = cards.find((card) => card.uuid === uuid);
      if (cardToDelete) {
        const { uuid, listUuid } = cardToDelete;
        await deleteCard(token, uuid, listUuid);
      }
      setIsHidden(true);
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    console.log("is this running?");
    if (!socketRef.current) {
      socketRef.current = io(`${projectConfig.apiBaseUrl}/v2/cards/member`, {});
    }

    const socket = socketRef.current;

    socket.on("member", (data: any, uuid: string) => {
      if (data.type === "update") {
        console.log("updaeting the card memevers with the socket");
        const newCard = data.data;
        console.log("new card", newCard);

        return newCard;
      } else {
        throw new Error("Failed to create card with socket");
      }
    });
    console.log("current users", currentUsers);
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 flex justify-center overflow-y-auto items-center z-50 bg-black bg-opacity-50 ${
        isHidden ? "block" : "hidden"
      }`}
    >
      <div
        className="modal-content-container flex justify-center items-center"
        style={{ minHeight: "580px" }}
      >
        <div
          id="modal-content"
          className="flex flex-col bg-foreground text-background rounded-lg w-[580px]"
        >
          {" "}
          <div className="title bar relative flex flex-row items-center justify-between">
            <div className="ml-4 py-2 mt-4 flex flex-row items-center">
              <Icon name="table" />

              <div className="text-xl px-2 font-semibold text-wrap">
                {title?.length > 20 ? title?.slice(0, 45) + "..." : title}
              </div>
              <Button
                isIconOnly
                className="bg-inherit absolute top-0 right-0 text-black hover:bg-white rounded-full"
                onClick={() => setIsHidden(true)}
              >
                X
              </Button>
            </div>
          </div>
          {/* The members section is only visible if at least one user is added to the card
              For each of the users we will render the users avatar
          */}
          <div className="flex flex-row ml-2 min-h-[40px] gap-1 items-center">
            {currentMembersData?.length > 0 &&
              currentMembersData.map((currentMember: User) => (
                <Avatar key={currentMember.uuid} src={currentMember.image} />
              ))}
          </div>
          <div className="flex flex-row h-full w-full gap-3">
            <div className="main ml-3 w-[80%] h-full">
              <div className="section h-[40%]">
                <div className="flex flex-col my-4 min-h-48 gap-2">
                  <div className="flex flex-row gap-1">
                    <Icon name="description" />
                    <p className="font-semibold">Description</p>
                  </div>
                  {/* This should be a separate component?? */}
                  <TextArea desc={selectedCard?.description} />
                  {/* <Input
                    placeholder="Write unit tests..."
                    type="text"
                    classNames={{
                      base: "max-w-full sm:max-w-[28rem] ml-9 h-10 bg-foreground",
                      mainWrapper: "flex h-full w-full  bg-forground",
                      input:
                        "text-small font-semibold group-data-[focus=true]:text-background",
                      inputWrapper:
                        "dark:focus-within:!bg-foreground/70 data-[hover=true]:bg-foregound/80 h-full w-60  !cursor-text dark:focus-within:text-black bg-white hover:bg-foreground border-slate-100 rounded-md",
                    }}
                  ></Input> */}
                </div>
              </div>
              <div className="h-[60%] ">
                <div className="flex flex-row gap-1 mb-2">
                  <Icon name="comments" />
                  <h3 className="font-semibold">Comments</h3>
                </div>
                {/* Below should be dynamic data */}
                <div className="flex flex-row gap-2 my-2  items-center">
                  <Avatar
                    as="button"
                    className="transition-transform"
                    size="sm"
                    src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                  />
                  <Input
                    placeholder="Add a comment below..."
                    className="w-full"
                    type="text"
                    classNames={{
                      base: "max-w-full sm:max-w-[28rem] h-10 bg-foreground",
                      mainWrapper: "flex h-full w-full  bg-forground",
                      input:
                        "text-small font-semibold group-data-[focus=true]:text-background",
                      inputWrapper:
                        "dark:focus-within:!bg-foreground/70 data-[hover=true]:bg-foregound/80 h-full w-60  !cursor-text dark:focus-within:text-black bg-white hover:bg-foreground border-slate-100 rounded-md",
                    }}
                  ></Input>
                </div>
                <div className="flex flex-col gap-4 min-h-[150px] mb-5">
                  <Comment text={"Some comment made by user"} />
                </div>
              </div>
            </div>
            <div
              className={`actions items-start flex flex-col w-[25%] gap-2 mt-8 `}
            >
              <p className="text-sm">Add to card</p>
              <div className="bg-cards items-center rounded-lg hover:bg-slate-300">
                <Button
                  size="sm"
                  color="primary"
                  onPress={() => {
                    handleDeleteCard();
                  }}
                  className="text-white"
                >
                  Delete Card
                </Button>
              </div>

              <Button
                size="sm"
                className="bg-primary mr-2"
                onClick={() => setIsMemberVisible(!isMemberVisible)}
              >
                Member
              </Button>
              <div
                className={`relative ${isMemberVisible ? "block " : "hidden"}`}
              >
                <PopUpWrapper
                  classNames="bg-white absolute top-0 left-0  min-h-[100px] w-[200px]  z-20 "
                  width={"300px"}
                  height={"350px"}
                >
                  <div className="flex flex-col gap-1 min-h-[50px]">
                    <p className="flex text-background font-semibold ml-1 min-h-[25px] mt-2">
                      Members{" "}
                    </p>
                    <div className="">
                      {currentMembersData?.map((member: any) => {
                        return (
                          <UserCard
                            key={member.uuid}
                            user={member}
                            removeUser={() => removeMember(member)}
                          />
                        );
                      })}
                    </div>
                    <Button
                      isIconOnly
                      className="bg-inherit  absolute top-0 right-0 rounded-full hover:bg-foreground text-black"
                      onClick={closeAddMember}
                      size="sm"
                    >
                      X
                    </Button>
                  </div>

                  <div className="added members"></div>
                  <div className="border-b-1 border-solid border-black"></div>
                  <PopUpBody classNames="overflow-y-auto">
                    <p className="font-semibold text-sm px-1">Board members</p>
                    {/* Will need to iterate through the current workspace members and render a UserCard for each of them 
                    workspace.users is an array of user.uuids(strings) so then we would fetch the userdata from the backend
                     and render the usercard with the user data
                    */}
                    {nonMembers?.map((user: any) => {
                      return (
                        <UserCard
                          key={user?.uuid}
                          addUser={() => handleAddUser(user)}
                          user={user}
                        />
                      );
                    })}
                  </PopUpBody>
                </PopUpWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
