import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, CircleDollarSign, Home, Inbox, Paintbrush, Search, Settings } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import AIInterfaceLogo from '../../public/AIInterfaceLogo-white.png'

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Diseños",
        url: "/designs",
        icon: Paintbrush,
    },
    {
        title: "Creditos",
        url: "/credits",
        icon: CircleDollarSign,
    },

]

export function AppSidebar() {
    const path = usePathname();
    console.log(path)
    return (
        <Sidebar className=''>
            <SidebarHeader className=''>
                <div className='p-4 flex justify-center items-center '>
                    <div className='flex items-center gap-2'>
                        <Image src={AIInterfaceLogo} alt='logo' width={100} height={100}
                            className='w-[150px] h-[50px]' />
                        
                    </div>
                   
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => (
                                <a href={item.url} key={index}
                                    className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-purple-900 rounded-lg text-white
                                 ${path == item.url && ''}
                                 `}>
                                    <item.icon className='h-5 w-5 text-white' />
                                    <span>{item.title}</span>
                                </a>

                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            
        </Sidebar>
    )
}