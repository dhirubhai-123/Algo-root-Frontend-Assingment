import React from 'react'
import { ArrowLeft, Home, LogIn } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-row'>
            <SideBar />
            <div className='w-full min-h-screen flex justify-center items-center flex-col'>
                {/* <div className='h-[10vh] border border-black '> */}
                <div>

                    <img src="src\assets\undraw_relax-mode_6i13.svg" alt="Page Not Found" className='h-[30vh] w-auto' />
                </div>
                <div className='mt-6 text-lg md:text-2xl text-center'> Page Not Found !!</div>

                {/* </div> */}
                <div className='flex gap-x-4 mt-4'>
                    <Home className='hover:text-pink-600 hover:cursor-pointer' onClick={() => navigate("/")} />
                    <LogIn className='hover:text-pink-600 hover:cursor-pointer' onClick={() => navigate("/signup")} />
                </div>
            </div>
        </div>
    )
}

export default NotFound