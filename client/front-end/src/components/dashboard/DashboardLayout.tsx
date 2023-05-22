import React from "react";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col lg:flex-row items-center h-auto md:h-screen">
      <div className="hidden lg:block w-[0%] lg:w-[17%] h-full">
        <Sidebar />
      </div>
      <div className="flex flex-col items-center w-full lg:w-[83%] h-full min-h-screen">
        <div className="w-full h-full flex flex-col overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
