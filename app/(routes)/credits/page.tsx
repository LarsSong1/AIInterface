"use client"
import { useAuthContext } from '@/app/provider'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Credits() {

    const { user } = useAuthContext();
    const [userData, setUserData] = useState<any>();
    useEffect(() => {
        user && GetUserCredits();
    }, [user])

    const GetUserCredits = async () => {
        const result = await axios.get('/api/user?email=' + user?.email);
        console.log(result.data)
        setUserData(result.data);
    }

    return (
        <div>
            <h2 className='font-bold text-2xl'>Credits</h2>

            <div className='p-5 bg-black border border-white rounded-xl border
             flex justify-between items-center mt-6'>
                <div>
                    <h2 className='font-bold text-xl text-white'>Mis Creditos</h2>
                    {userData?.credits && <p className='text-lg text-white text-xs '>{userData?.credits} Créditos quedan</p>}
                </div>
                <Button className='bg-purple-900'>Comprar más</Button>
            </div>
        </div>
    )
}

export default Credits