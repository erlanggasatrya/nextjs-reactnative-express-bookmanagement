import React from "react";

const page: React.FC<{ params: { titles: string[] } }> = async ({
  params: { titles },
}) => {
  return <div>Title Page: {titles.join(", ")}</div>;
};

export default page;
