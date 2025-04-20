import React from "react";
import DashboardProvider from "../(main)/provider";

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-secondary">
      <DashboardProvider>
        <div className="p-10 ">
        {children}
        </div>
        </DashboardProvider>
    </div>
  );
};

export default DashboardLayout;
