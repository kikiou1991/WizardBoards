import React from "react";

interface PopUpWrapperProps {
  children: React.ReactNode;
  classNames?: string;
}

//will need to change any to the correct type
const PopUpWrapper = ({ children, classNames }: PopUpWrapperProps) => {
  return <div className={`${classNames}`}>{children}</div>;
};

export default PopUpWrapper;
