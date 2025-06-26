"use client"
import { auth } from '@/configs/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useAuthContext } from '../provider';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ProfileAvatar() {

    const user = useAuthContext();
    const router = useRouter();
    const onButtonPress = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            router.replace('/')
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div>
            <Popover >
                <PopoverTrigger className=''>
                    {user?.user?.photoURL && <img src={user?.user?.photoURL} alt='profile' className='w-[35px] h-[35px] rounded-full bg-black' />}
                </PopoverTrigger>
                <PopoverContent className='w-[100px] bg-black mx-w-sm'>
                    <Button onClick={onButtonPress} className='bg-black text-white'>Salir</Button>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ProfileAvatar