import React, { useEffect } from 'react'
import { Navigate, NavLink } from "react-router-dom"
import { MenuIcon, XCircle, LogOutIcon } from "lucide-react"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const SideBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        if (!localStorage.getItem("userEmail") && !localStorage.getItem("userPassword") && !localStorage.getItem("userFullName")) {
            navigate('/')
            // window.document.reload();
            return toast.error("Didn't find details redirecting to Signup page")
        }

        localStorage.removeItem("userEmail")
        localStorage.removeItem("userFullName")
        localStorage.removeItem("userPassword")
        return toast.success("Logged Out Successfully ")
    }

    // useEffect(() => { toast.success("ShowMenu") }, [showMenu])

    return (
        <div className='fixed z-20 text-yellow-400'>
            <div className=" top-0 bg-black min-w-28 border-2 border-black text-center py-1  h-screen hidden lg:block">

                <ul className='flex justify-center items-center flex-col h-full text-lg sm:text-xl md:2xl'>
                    <li>
                        <button className='transition-all duration-300 hover:text-blue-400 md:hover:text-3xl'>
                            <NavLink to={"/details"} className={({ isActive }) => isActive ? "text-red-500 " : null}>Ac Details</NavLink>
                        </button>
                    </li>
                    <li>
                        <button className='transition-all duration-300 hover:text-blue-400 md:hover:text-3xl'>
                            <NavLink to={"/home"} className={({ isActive }) => isActive ? "text-red-500" : null}>Home</NavLink>
                        </button>
                    </li>
                    <li>
                        <button className='transition-all duration-300 hover:text-blue-400 md:hover:text-3xl'>
                            <NavLink to={"/signup"} className={({ isActive }) => isActive ? "text-red-500 hover:text-3xl" : null} onClick={handleLogOut}>Logout</NavLink>
                        </button>
                    </li>
                </ul>

            </div>

            <div className='sticky top-0 block lg:hidden m-3 px-1 md:px-2 '>
                <MenuIcon className='size-8 hover:cursor-pointer hover:text-red-400' onClick={() => setShowMenu(!showMenu)} />
            </div>

            <div className={`relative z-50 h-screen w-60 ${showMenu ? 'block' : 'hidden'} border-1 border-black bg-black text-yellow-200`}>

                <ul className='flex justify-center items-center flex-col h-full text-lg sm:text-xl md:2xl'>
                    <li>
                        <button className='transition-all duration-300 hover:text-blue-400 md:hover:text-3xl'>
                            <NavLink to={"/details"} className={({ isActive }) => isActive ? "text-red-500 " : null}>Details</NavLink>
                        </button>
                    </li>
                    <li>
                        <button className='transition-all duration-300 hover:text-blue-400 md:hover:text-3xl'>
                            <NavLink to={"/home"} className={({ isActive }) => isActive ? "text-red-500" : null}>Home</NavLink>
                        </button>
                    </li>
                    <li>
                        <button className='transition-all duration-300 hover:text-blue-400 md:hover:text-3xl'>
                            <NavLink to={"/signup"} className={({ isActive }) => isActive ? "text-red-500 hover:text-3xl" : ""} onClick={handleLogOut}>Logout </NavLink>
                        </button>
                    </li>
                    <li>
                        <XCircle onClick={() => setShowMenu(!showMenu)} className='transition-all duration-300 m-auto text-3xl font-semibold text-red-300 size-12 mt-2 hover:size-14 hover:cursor-pointer hover:text-red-400' />
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default SideBar