import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import ProfileAvatar from './ProfileAvatar'
import Image from 'next/image'
import AIInterfaceLogo from '../../public/AIInterfaceLogo-white.png'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


function AppHeader({ hideSidebar = false }) {
    return (
        <div className='p-4 bg-black shadow-sm flex items-center justify-between w-full '>
            {!hideSidebar ? <SidebarTrigger /> :
                <Link href={'/dashboard'} className='flex items-center gap-2'>
                    <Image src={AIInterfaceLogo} alt='logo' width={100} height={100}
                        className='w-[120px] h-[40px]' />
                    
                </Link>
            }
            <ProfileAvatar />
        </div>
    )
}

export default AppHeader