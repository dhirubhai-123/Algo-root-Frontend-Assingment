import React, { useEffect } from 'react'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { toast } from 'react-hot-toast'
import { Link, Route } from 'react-router-dom'
import Home from './Home'
import { saveToLocalStorage } from './utils/myFunctions'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const handleSubmit = () => {
        // toast.success("something happened")
        if (data.fullName.trim().length < 10) { return toast.error("Name should be at least 10 chars long !!"); }
        if (!data.email.toString().includes("@")) { return toast.error("Email is invalid") }
        if (data.password.length != 6) { return toast.error("password should be 6 chars long"); }

        const success = saveToLocalStorage(data);
        if (success) {
            navigate('/home');
            toast.success("Details are saved !!")
        } else {
            toast.error("Cant save details!!")
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // useEffect(() => { console.log(data) }, [data])

    return (
        <>
            <div className='flex justify-center items-center w-full h-screen bg-black text-white'>
                <div className='border-2 border-pink-500 rounded-md shadow-2xl shadow-pink-400'>
                    <h3 className='text-3xl text-center my-2 font-semibold'>Signup</h3>
                    <div className='text-xl m-4'>

                        <h2>Full Name </h2>
                        <input type="text" name='fullName' className='my-2 text-2xl font-serif text-black border-2 w-full border-black rounded-md focus:outline-double focus:border-slate-700 focus:shadow-md focus:shadow-pink-300' value={data.fullName} onChange={handleChange} />
                        <h2>Email </h2>
                        <input type="email" name='email' className='my-2 text-2xl font-serif text-black border-2 w-full border-black rounded-md focus:outline-double focus:border-slate-700 focus:shadow-md focus:shadow-pink-300' value={data.email} onChange={handleChange} />
                        <h2>Password</h2>
                        <input type="password" name='password' className='my-2 text-2xl font-serif text-black border-2 border-black w-full rounded-md focus:outline-double focus:border-slate-700 focus:shadow-md focus:shadow-pink-300' value={data.password} onChange={handleChange} />
                        <div>
                            <button className='w-full border-2 border-pink-400 my-2 bg-pink-500 hover:bg-pink-600 text-2xl text-black font-semibold font-serif hover:text-slate-800 hover:border-slate-600 hover:border-double rounded-md' type='submit' onClick={handleSubmit}>Submit</button>
                        </div>
                        <div>
                            Already have an account? <Link to={'/signup'} className='text-pink-600'>Login here</Link>
                        </div>
                    </div>

                </div>
                <form onSubmit={handleSubmit}>
                    <div className=''>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Signup