// "use client";
import dynamic from "next/dynamic";
import React from "react";

const Dashboard = dynamic(() => import("./Component/Dashboard"), {
  ssr: false,
});

export const metadata = {
  title: "Dashboard",
};
const page = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default page;
