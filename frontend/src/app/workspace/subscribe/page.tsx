import Socials from "@/components/navbar/socials";
import React from "react";

const Subscribe = () => {
  return (
    <div className="flex flex-col items-center text-foreground mx-auto w-[70%] gap-3 mt-10 justify-center h-full">
      <h1 className="text-4xl">Gotcha!!! There is no subscription here!</h1>
      <p className="flex text-center">
        Every feature comes fully equipped straight out of the box! This project
        has been a real passion of mine, something I've poured my free time into
        with joy. My hope is that whoever comes across it finds just as much
        enjoyment in using it as I did in creating it!
      </p>
      <div className="flex flex-col items-center">
        <h3 className="font-semibold text-2xl">Features to come</h3>
        <ul className="flex flex-col gap-1 items-center">
          <li>Realtime collaboration</li>
          <li>Notifications</li>
          <li>Custom backgrounds for boards</li>
          <li>Calendar</li>
        </ul>
        <h2 className="mt-5">You can get in touch with me here:</h2>
        <div className="mt-2">
          <Socials />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
