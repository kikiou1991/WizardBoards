import React from "react";

interface Props {
  toggle: () => void;
}

const VisibilityModal = ({ toggle }: Props) => {
  return (
    <div
      onClick={toggle}
      className="absolute inset-0 bg-foreground text-background rounded-lg w-[250] h-[250]"
    >
      VisibilityModal
    </div>
  );
};

export default VisibilityModal;
