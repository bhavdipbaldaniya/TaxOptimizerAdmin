import dynamic from "next/dynamic";
import React from "react";

const Login = dynamic(() => import("./Component/Login"), {
  ssr: false,
});


export const metadata = {
  title: "Login",
};
const page = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default page;
