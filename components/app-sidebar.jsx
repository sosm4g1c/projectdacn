"use client";
import { Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import { SideBarOptions } from "../services/Constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


export function AppSidebar() {
  const path = usePathname();
  const router  = useRouter('/dashboard/create-interview'); 
  console.log(path);

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={100}
          className=" w-[150px]"
        />
        
        <Button className="w-full" onClick={() => router.push('/dashboard/create-interview')}>
          <Plus /> Tạo Phỏng Vấn
        </Button>
        
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton asChild className={`"p-5" ${path == option.path && 'bg-blue-100'}`}>
                    <Link href={option.path}>
                      <option.icon  className={` ${path == option.path && 'text-primary'}`}/>
                      <span className={`"text-[16px]" font-medium ${path == option.path && 'text-primary'}`}>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
