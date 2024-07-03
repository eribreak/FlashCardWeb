'use client' ;
import React, {useState, useEffect} from 'react';
import { LayoutDashboard } from 'lucide-react';
import { UserCog } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Presentation } from 'lucide-react';

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  import Link from 'next/link';
  import { usePathname, useRouter } from 'next/navigation'
  
  
export default function Sidebar(){
    const router = useRouter();
    const pathname = usePathname()


    return <div className='bg-white flex flex-col w-[240px] min-w-[240px] border-r min-h-screen p-4'>
        <div className='ml-3 mb-4 font-bold text-xl'>ADMIN MENU</div>
    <div className='grow'>
        <Command style={{overflow:'visible'}}>
          <CommandList style={{overflow:'visible'}}>
            <div className='flex flex-col gap-2'>
              <div className={pathname=="/admin/mainmenu/dashboard"?'flex gap-2 font-bold py-2 px-4 rounded-lg bg-slate-300 cursor-pointer':"flex gap-2 font-bold py-2 px-4 rounded-lg hover:bg-slate-100 cursor-pointer"}
              onClick={() => router.push('/admin/mainmenu/dashboard')}>
                <LayoutDashboard className='mr-2 my-auto'/>Dashboard
              </div>
              <div className={pathname=="/admin/mainmenu/edituser"?'flex gap-2 font-bold py-2 px-4 rounded-lg bg-slate-300 cursor-pointer':"flex gap-2 font-bold py-2 px-4 rounded-lg hover:bg-slate-100 cursor-pointer"}
              onClick={() => router.push('/admin/mainmenu/edituser')}>
                <UserCog className='mr-2 my-auto'/>Edit User
              </div>
              <div className={pathname=="/admin/mainmenu/editclass"?'flex gap-2 font-bold py-2 px-4 rounded-lg bg-slate-300 cursor-pointer':"flex gap-2 font-bold py-2 px-4 rounded-lg hover:bg-slate-100 cursor-pointer"}
              onClick={() => router.push('/admin/mainmenu/editclass')}>
                <Presentation className='mr-2 my-auto'/>Edit class
              </div>
            </div>
          </CommandList>
        </Command>
</div>
    <div className='flex'> <LogOut className='mr-2'/><button onClick={() => {
      localStorage.removeItem("admin")
      router.push('/admin/auth/loginn')
      }
      }>Log out</button></div>
    </div>
    ;
}

