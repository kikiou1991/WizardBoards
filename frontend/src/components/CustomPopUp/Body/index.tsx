import React from "react";
interface PopUpBodyProps {
  children: React.ReactNode;
}

const PopUpBody = ({ children }: PopUpBodyProps) => {
  return <div>{children}</div>;
};

export default PopUpBody;
