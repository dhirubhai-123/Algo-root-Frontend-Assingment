import React, { useContext, useEffect } from 'react'
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { sortTechnique, searchButton } from './context/context.js';

const Navbar = () => {

    const [rotate, setRotate] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")

    const { sortTech, setSortTech } = useContext(sortTechnique);
    const { searchButtton, setSearchButtton } = useContext(searchButton);

    // useEffect(() => {
    //     console.log(sortTech);
    // }, [sortTech])

    return (
        <div className='flex justify-around items-center text-2xl border-2 rounded-3xl w-[88%] max-h-20 my-2 ml-14 md:mx-32 '>
            <div className='hover:cursor-pointer'>
                Logo
            </div>
            <div className='flex justify-center items-center hover:cursor-pointer'
                onClick={() => setRotate(!rotate)} >
                {/* Menu */}
                <select name="" id="" style={{ appearance: 'none' }} className='hover:cursor-pointer focus-visible:border-none'
                    onChange={(e) => {
                        e.preventDefault;
                        setSortTech(e.target.value)
                    }}
                    disabled={searchButtton}>
                    <option value="">Menu&darr;</option>
                    <option value={"Asort"} >
                        Sort-Ascending
                    </option>
                    <option value={"Dsort"}>
                        Sort-Descending
                    </option>
                </select>
                {/* <ChevronDown className={`pt-1 ${rotate ? `rotate-180 transition-all duration-300` : null}`} /> */}
            </div>
        </div>
    )
}

export default Navbar