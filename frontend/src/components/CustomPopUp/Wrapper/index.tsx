import React from "react";
import PopUpBody from "../Body";

interface PopUpWrapperProps {
  children: React.ReactNode;
  classNames?: string;
  width?: string;
  height?: string;
}

const PopUpWrapper = ({
  children,
  classNames,
  width = "500px",
  height = "150px",
}: PopUpWrapperProps) => {
  return (
    <div
      className={`${classNames} h-[${height}] w-[${width}]  rounded-lg shadow-lg border-1 border-slate-200`}
    >
      {children}
    </div>
  );
};

export default PopUpWrapper;
