"use client"
import { useAuthContext } from '@/app/provider'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DesignCard from './_components/DesignCard';
import { RECORD } from '@/app/view-code/[uid]/page';

function Designs() {

    const { user } = useAuthContext();
    const [wireframeList, setWireframeList] = useState([]);
    useEffect(() => {
        user && GetAllUserWireframe();
    }, [user])

    const GetAllUserWireframe = async () => {

        const result = await axios.get('/api/wireframe-to-code?email='
            + user?.email);
        console.log(result.data);
        setWireframeList(result.data);
    }

    return (
        <div>
            <h2 className='font-bold text-2xl text-white'>Wireframe y Códigos</h2>
            <p className='text-white text-xs'>Puedes ver el listado de todos los Códigos que has generado</p>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-7 mt-10'>
                {wireframeList?.map((item: RECORD, index) => (
                    <DesignCard key={index} item={item} />
                ))}
            </div>
        </div>
    )
}

export default Designs