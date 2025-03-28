import React, { useState, useContext } from 'react'
import { SearchIcon } from "lucide-react"
import { searchInput, searchButton } from './context/context.js'

const SearchBar = () => {

    const { inputValue, setInputValue } = useContext(searchInput);
    const { searchButtton, setSearchButtton } = useContext(searchButton);

    const handleChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    }

    return (
        <div className='flex border px-3 mt-2 border-black w-auto lg:w-[80%] mx-4 rounded-2xl justify-between items-center lg:absolute lg:left-28 shadow-lg shadow-slate-300'>
            <input type="text" className='h-10 w-full focus:outline-none focus:border-none text-2xl' value={inputValue} onChange={handleChange} />
            <button onClick={() => setSearchButtton(!searchButtton)} disabled={inputValue.length < 3}>
                <SearchIcon className='size-8 mx-2' />
            </button>
        </div>
    )
}

export default SearchBar