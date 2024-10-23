// "use client";
import dynamic from "next/dynamic";
import React from "react";

const Register = dynamic(() => import("./Component/Register"), {
  ssr: false,
});
export const metadata = {
    title: 'Register',
  }
const page = () => {
  return (
    <>
      <Register />
    </>
  );
};

export default page;
