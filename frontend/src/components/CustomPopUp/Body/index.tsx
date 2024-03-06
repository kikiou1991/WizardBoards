import React from "react";
interface PopUpBodyProps {
  children: React.ReactNode;
  classNames?: string;
}

const PopUpBody = ({ children, classNames }: PopUpBodyProps) => {
  return <div className={`${classNames}`}>{children}</div>;
};

export default PopUpBody;
