import React from 'react'
import SideBar from './SideBar'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import DataShowCasing from './DataShowCasing'
import { useContext, useState } from 'react'
import { searchInput, sortTechnique, searchButton } from "./context/context.js"

const Home = () => {

    const [inputValue, setInputValue] = useState("");
    const [sortTech, setSortTech] = useState("");
    const [searchButtton, setSearchButtton] = useState(false);

    return (
        <>
            <searchButton.Provider value={{ searchButtton, setSearchButtton }}>
                <sortTechnique.Provider value={{ sortTech, setSortTech }}>
                    <searchInput.Provider value={{ inputValue, setInputValue }}>
                        <div className='flex flex-row'>
                            <SideBar />
                            <Navbar />
                        </div>
                        <SearchBar />
                        <DataShowCasing />
                    </searchInput.Provider >
                </sortTechnique.Provider>
            </searchButton.Provider>
        </>
    )
}

export default Home