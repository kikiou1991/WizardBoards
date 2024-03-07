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
  width,
  height,
}: PopUpWrapperProps) => {
  return (
    <div
      className={`${classNames}  h-[${height}] w-[${width}] rounded-lg shadow-lg `}
    >
      {children}
    </div>
  );
};

export default PopUpWrapper;
