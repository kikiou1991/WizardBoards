import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import Icon from "../Icons";
import Comment from "../comment";
import PopUpWrapper from "../CustomPopUp/Wrapper";
import PopUpBody from "../CustomPopUp/Body";
import UserCard from "../usercard";
import { UserContext, UserContextType } from "@/contexts/Usercontext";

//This board will depend on the data from the backend, when a card is clicked it will show the details of the card
//We get the right card by its id

const CardDetails = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useContext(UserContext) as UserContextType;
  const [isMemberVisible, setIsMemberVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
  };
  const closeAddMember = () => {
    setIsMemberVisible(false);
  };
  const handleAddUser = () => {
    alert("user added to card");
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center overflow-y-auto items-center z-10 bg-black bg-opacity-50 ${
        isVisible ? "block" : "hidden"
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
          <div className="title bar flex flex-row items-center p-2">
            <div className=" px-2 ">{"name of card"}</div>
            <Button
              isIconOnly
              className="bg-inherit ml-auto text-black top-1 right-1"
              onClick={closeModal}
            >
              X
            </Button>
          </div>
          <div className="flex flex-row h-full w-full gap-3">
            <div className="main ml-3 w-[80%] h-full">
              <div className="section h-[40%]">
                <div className="flex flex-col my-8 gap-2">
                  <div className="flex flex-row gap-1">
                    <Icon name="description" />
                    <p className="font-semibold">Description</p>
                  </div>
                  {/* This should be a separate component */}
                  <Input
                    placeholder="Write unit tests for fetching posts"
                    type="text"
                    classNames={{
                      base: "max-w-full sm:max-w-[28rem] h-10 bg-foreground",
                      mainWrapper: "flex h-full w-full ml-4 bg-forground",
                      input:
                        "text-small font-semibold group-data-[focus=true]:text-background",
                      inputWrapper:
                        "dark:focus-within:!bg-foreground/70 data-[hover=true]:bg-foregound/80 h-full w-60  !cursor-text dark:focus-within:text-black bg-foreground hover:bg-foreground border-slate-100 rounded-md",
                    }}
                  ></Input>
                </div>
              </div>
              <div className="h-[60%] ">
                <div className="flex flex-row gap-1 mb-2">
                  <Icon name="comments" />
                  <h3 className="font-semibold">Comments</h3>
                </div>
                {/* Below should be dynamic data */}
                <div className="flex flex-row gap-2 my-2 items-center">
                  <Avatar
                    as="button"
                    className="transition-transform p"
                    size="sm"
                    src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                  />
                  <Input
                    placeholder="Write unit tests for fetching posts"
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
                <div className="comments by user flex flex-col gap-4 mb-5">
                  <Comment text={"Some comment made by user"} />
                  <Comment
                    text={"Hello world"}
                    avatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                  <Comment
                    text={"Hello world"}
                    avatar="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  />
                  <Comment text={"React is so much funb"} />
                  <Comment text={"Next.js is life"} />
                </div>
              </div>
            </div>
            <div
              className={`actions items-start flex flex-col w-[20%] gap-2 mt-8 `}
            >
              <div
                className={`relative ${isMemberVisible ? "block" : "hidden"}`}
              >
                <PopUpWrapper
                  classNames="bg-foreground absolute top-10 left-20 z-20 "
                  width="200px"
                  height="300px"
                >
                  <div className="flex flex-row">
                    <p className="flex text-background font-semibold items-center justify-center py-1">
                      Members{" "}
                    </p>
                    <Button
                      isIconOnly
                      className="bg-inherit ml-auto hover:bg-slate-400 text-black top-1 right-1"
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

                    <UserCard addUser={handleAddUser} user={user} />
                    <UserCard addUser={handleAddUser} user={user} />
                    <UserCard addUser={handleAddUser} user={user} />
                    <UserCard addUser={handleAddUser} user={user} />
                  </PopUpBody>
                </PopUpWrapper>
              </div>
              <p className="text-sm">Add to card</p>
              <Button
                size="sm"
                className="bg-primary mr-2"
                onClick={() => setIsMemberVisible(true)}
              >
                Member
              </Button>
              <Button size="sm" className="bg-primary mr-2">
                Label
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
