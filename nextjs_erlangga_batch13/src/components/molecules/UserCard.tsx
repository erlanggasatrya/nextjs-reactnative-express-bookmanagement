import React from "react";
import UserImage from "../atoms/UserImage";

const UserCard = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-blue-400 px-3 py-1 text-center flex justify-center items-center fixed">
        <UserImage name="Erlangga" />
      </div>
    </div>
  );
};

export default UserCard;
