"use client";
import React from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import  WelcomeContainer  from "../(main)/_components/WelcomeContainer";

function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        {/* <SidebarTrigger /> */}
        <WelcomeContainer />
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
