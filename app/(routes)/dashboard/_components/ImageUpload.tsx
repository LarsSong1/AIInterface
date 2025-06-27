"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CloudUpload, Loader2Icon, WandSparkles, X } from 'lucide-react'
import Image from 'next/image'
//@ts-ignore
import uuid4 from "uuid4";
import React, { ChangeEvent, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/configs/firebaseConfig'
import axios from 'axios'
import { uuid } from 'drizzle-orm/pg-core'
import { useAuthContext } from '@/app/provider'
import { useRouter } from 'next/navigation'
import Constants from '@/data/Constants'
import { toast } from 'sonner'
function ImageUpload() {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [file, setFile] = useState<any>();
    const [model, setModel] = useState<string>();
    const [description, setDescription] = useState<string>();
    const { user } = useAuthContext();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            console.log(files[0])
            const imageUrl = URL.createObjectURL(files[0]);
            setFile(files[0]);
            setPreviewUrl(imageUrl);
        }
    }


    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    const OnConverToCodeButtonClick = async () => {
        if (!file || !model || !description) {
            console.log("Select All Field");
            return;
        }
        setLoading(true);
        //Save Image to Firebase
        // const fileName = Date.now() + '.png';
        // const imageRef = ref(storage, "Wireframe_To_Code/" + fileName);
        // await uploadBytes(imageRef, file).then(resp => {
        //     console.log("Image Uploaded...")
        // });

        // const imageUrl = await getDownloadURL(imageRef);
        // console.log(imageUrl);

        // Save Info To Database
        // const result = await axios.post('/api/wireframe-to-code', {
        //     uid: uid,
        //     description: description,
        //     imageUrl: imageUrl,
        //     model: model,
        //     email: user?.email
        // });
        try {
            const uid = uuid4();
            console.log(uid);

            // 
            
            const base64Image = await fileToBase64(file);
            const result = await axios.post('/api/wireframe-to-code', {
                uid: uid,
                description: description,
                imageUrl: base64Image, // Imagen en base64
                model: model,
                email: user?.email
            });

            if (result.data?.error) {
                console.log("Not Enough credits");
                toast('Not Enough Credits!');
                setLoading(false);
                return;
            }
            setLoading(false);
            router.push('/view-code/' + uid);
        } catch (error) {
            toast('Error al procesar la imagen')
        }
    }

    return (
        <div className='mt-2'>
            <div className='flex flex-col justify-center items-center '>
                {!previewUrl ? <div className='p-2 rounded-md shadow-md
                flex flex-col items-center justify-center
                '>
                    <CloudUpload color='purple' className='h-10 w-10 text-primary' />
                    <h2 className='font-bold text-lg text-white'>Sube una Imagen</h2>

                    <p className='text-gray-400 text-xs mt-2'>Presiona el Botón para Escoger tu Wireframe </p>
                    <div className='p-5 w-full flex mt-4 justify-center'>
                        <label htmlFor='imageSelect'>
                            <h2 className='p-2 bg-black border border-white font-bold text-white rounded-md px-5'>Selecciona la Imagen </h2>
                        </label>

                    </div>
                    <input type="file" id='imageSelect'
                        className='hidden'
                        multiple={false}
                        onChange={OnImageSelect}
                    />

                </div> :
                    <div className='p-5 border border-dashed'>
                        <Image src={previewUrl} alt='preview' width={500} height={500}
                            className='w-full h-[250px] object-contain'
                        />
                        <X className='flex ite justify-end w-full cursor-pointer'
                            onClick={() => setPreviewUrl(null)}
                        />

                    </div>
                }
                <div className='p-2 shadow-md rounded-lg w-[50%]'>

                    <h2 className='font-bold text-lg text-white'>Selecciona el Modelo de IA</h2>
                    <Select onValueChange={(value) => setModel(value)}>
                        <SelectTrigger className="w-full text-white">
                            <SelectValue className='text-white' placeholder="Seleccciona IA" />
                        </SelectTrigger>
                        <SelectContent className='bg-black text-white'>
                            {Constants?.AiModelList.map((model, index) => (
                                <SelectItem value={model.name} key={index} >
                                    <div className='flex items-center gap-2'>
                                        <Image src={model.icon} alt={model.name} width={25} height={25} />
                                        <h2> {model.name}</h2>
                                    </div>

                                </SelectItem>

                            ))}

                        </SelectContent>
                    </Select>

                    <h2 className='font-bold text-lg mt-2 text-white'>Ingresa la descripcion sobre el Wireframe</h2>
                    <Textarea
                        onChange={(event) => setDescription(event?.target.value)}
                        className='mt-3 h-[150px] text-white'
                        placeholder='Escribe acerca del diseño que deseas generar' />
                </div>
            </div>

            <div className='mt-10 flex items-center justify-center'>
                <Button className='bg-purple-900 text-white' onClick={OnConverToCodeButtonClick} disabled={loading}>
                    {loading ? <Loader2Icon className=' animate-spin' /> : <WandSparkles />}
                    Convertir a Código</Button>
            </div>
        </div>
    )
}

export default ImageUpload