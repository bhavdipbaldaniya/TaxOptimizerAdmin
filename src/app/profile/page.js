// "use client";
import dynamic from "next/dynamic";
import React from "react";

const Profile = dynamic(() => import("./Component/Profile"), {
  ssr: false,
});

export const metadata = {
  title: "Profile",
};
const page = () => {
  return (
    <>
      <Profile />
    </>
  );
};

export default page;
