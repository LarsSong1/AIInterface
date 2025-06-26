import React from 'react'
import ImageUpload from './_components/ImageUpload'

function Dashboard() {
    return (
        <div className='xl:px-20'>
            <h2 className='font-bold text-3xl text-white'>Convierte tu Diseño</h2>
            <p className='font-light text-sm text-white'>Escoge el wireframe que desees y conviertelo aqui</p>
            <ImageUpload />
        </div>
    )
}

export default Dashboard