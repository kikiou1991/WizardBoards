import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import Icon from "../Icons";

const CalendarFrame = () => {
  const [date, setDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hoursOfDay = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  return (
    <div className="flex flex-col gap-2 calendar text-foreground">
      <div className="calendar-header flex flex-row gap-2 mx-4">
        <Button className="p-1" onClick={goToPreviousMonth}>
          Previous
        </Button>
        <Button className="p-1" onClick={goToNextMonth}>
          Next
        </Button>
        <Input
          classNames={{
            base: "max-w-full md:max-w-[15rem] h-10 !cursor-pointer",
            mainWrapper: "h-full ",
            input: "text-small !cursor-pointer",
            inputWrapper:
              "h-full font-normal text-foreground !cursor-pointer  ",
          }}
          style={{ minWidth: "80px" }}
          className="hidden md:flex cursor-pointer"
          placeholder="Type to search..."
          size="md"
          startContent={<Icon name="searchIcon" classname="white" />}
          type="search"
        />
      </div>
      <h2 className="mx-4">
        {date.toLocaleString("default", { month: "long", year: "numeric" })}
      </h2>
      <div className="rounded-lg  w-[950px] h-[400px]  text-black flex flex-col mx-4">
        <div className="w-full h-full flex flex-col items-center bg-foreground">
          <div className="w-full flex flex-row items-center">
            <div className="p-3">Daily overview</div>
            <div className="ml-auto mr-4">Space</div>
          </div>
          <div className="h-full pl-2 flex items-center justify-center w-full">
            {hoursOfDay.map((hour) => (
              <div className="h-[2rem] bg-foreground w-full pr-4  items-center flex justify-start">
                {hour}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row w-full h-full items-center">
          <div className="w-[20%] h-full flex flex-col justify-between items-center">
            {daysOfWeek.map((day) => (
              <div className="h-[50px] bg-foreground w-full items-center flex justify-center border-b-1 border-border">
                {day}
              </div>
            ))}
          </div>
          <div className="w-[80%] h-full flex flex-col  items-start bg-foreground">
            Tasks?
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarFrame;
