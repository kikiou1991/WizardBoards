import React from "react";

interface Props {
  toggle: () => void;
}

const VisibilityModal = ({ toggle }: Props) => {
  return (
    <div onClick={toggle} className="rounded-lg w-[250] h-[250]">
      VisibilityModal
    </div>
  );
};

export default VisibilityModal;
