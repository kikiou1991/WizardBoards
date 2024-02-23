import React from "react";

interface Props {
  toggle: () => void;
}

const VisibilityModal = ({ toggle }: Props) => {
  return (
    <div
      onClick={toggle}
      className="absolute z-10 bg-foreground text-background rounded-lg w-[250px] h-[250px]"
    >
      VisibilityModal
    </div>
  );
};

export default VisibilityModal;
