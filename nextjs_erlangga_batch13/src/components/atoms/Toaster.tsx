"use client";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";

const Toaster = () => {
  return (
    <ToastContainer
      position="top-left"
      transition={Slide}
      closeOnClick
      theme="colored"
    />
  );
};

export default Toaster;
