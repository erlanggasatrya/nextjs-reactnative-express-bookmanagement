import React from "react";

const UserImage: React.FC<{ name: string }> = ({ name }) => {
  return <div className="text-[45px]">Name: {name}</div>;
};

export default UserImage;
