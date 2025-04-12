'use client'
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const userId = useParams().id;
  return <div>page detail home, id: {userId}</div>;
};

export default page;
