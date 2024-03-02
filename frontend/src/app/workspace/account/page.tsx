import React from "react";

const AccountDetails = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="text-foreground text-3xl mt-5">
        This is your account page
      </div>
      <p className="text-foreground">
        You can change your password and edit your profile picture!
      </p>
    </div>
  );
};

export default AccountDetails;
