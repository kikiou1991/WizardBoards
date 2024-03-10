import Icon from "@/components/Icons";
import React from "react";

const Table = () => {
  return (
    <div className="flex flex-col gap-2 items-center mx-4 text-foreground">
      <div className="flex flex-row justify-start w-full h-full  gap-2 items-center">
        <Icon name="table" />
        <div className="text-2xl font-semibold py-3">Table</div>
      </div>
      <div className="table-area flex w-full h-full items-center justify-center">
        <div className="text-3xl "></div>
      </div>
    </div>
  );
};

export default Table;
