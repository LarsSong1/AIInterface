"use client"
import Image from "next/image";
import Link from "next/link";
import Authentication from "./_components/Authentication";
import { Button } from "@/components/ui/button";
import { auth } from "@/configs/firebaseConfig";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";
import AIInterfaceLogo from '../public/AIInterfaceLogo.png'

export default function Home() {
  // const user = auth?.currentUser;
  // console.log(user)
  const user = useAuthContext();
  console.log(user?.user)
  return (
    <div>
      <header className="flex  flex-wrap sm:justify-start  sm:flex-nowrap z-50 w-full bg-white  text-sm py-4 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700">
        <nav className="relative  py-4 max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex items-center justify-between">
            <div>
              <div className='flex items-center gap-2'>
                <Image src={AIInterfaceLogo} alt='logo' width={100} height={100}
                  className='w-[150px] h-[40px]' />
              </div>
            </div>
          </div>
          <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">

              {!user?.user?.email ? <Authentication>
                <div className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-purple-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-purple-500" >
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                  Inicia Sesión
                </div>
              </Authentication> :
                <ProfileAvatar />
              }
            </div>
          </div>
        </nav>
      </header>
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">


          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-black text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              Convierte Tus Wireframes
              <span className="bg-clip-text bg-gradient-to-tl from-purple-900  text-transparent"> a Código Facil</span>
            </h1>
          </div>


          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Nuestra aplicación te permite transformar diseños en código limpio y funcional, acelerando tu proceso de desarrollo.</p>
          </div>


          <div className="mt-8 gap-3 flex justify-center">
            {user?.user?.email ?
              <a className="bg-black hover:bg-purple-600 text-white flex gap-2 py-2 px-2 rounded-md items-center"
                href="/dashboard">
                Ir al Dashboard
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </a>
              : <Authentication >
                <Button className="bg-black hover:bg-purple-600">
                  <svg width="256" height="262" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
                  <p>Inciar con Google</p>

                </Button>
              </Authentication>
            }

          </div>




        </div>
      </div>

      

     

    </div>
  );
}
