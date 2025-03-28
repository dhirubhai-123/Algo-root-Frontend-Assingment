import React, { useContext, useEffect, useRef, useState } from 'react';
import { getData } from './utils/myFunctions';
import { searchButton, searchInput, sortTechnique } from "./context/context.js"
import { LoaderPinwheel, SearchX } from 'lucide-react';
import CardComponent from './CardComponent.jsx';
import SortedData from './SortedData.jsx';


const DataShowCasing = () => {
    const [users, setUsers] = useState([]);

    const { inputValue, setInputValue } = useContext(searchInput);
    const { searchButtton, setSearchButtton } = useContext(searchButton);
    const { sortTech, setSortTech } = useContext(sortTechnique);

    const [searchedUser, setSearchedUser] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;

    //Pagination Logic
    const indexOfLastUser = usersPerPage * currentPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    let currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // useEffect(() => {
    //     currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    // }, [users])

    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    //Getting the data.. whenever component is mounted
    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setUsers(data?.results || []);
        };
        fetchData();
        console.log("from global context", inputValue);
    }, []);

    // Callback function whenever user search something
    useEffect(() => {
        const handleSearch = () => {
            const user = users.filter(record => record.name.first.trim().toLowerCase() === inputValue.trim().toLowerCase())
            // console.log(user)
            setSearchedUser(user);
        }
        handleSearch();
    }, [searchButtton])

    useEffect(() => {
        console.log(searchedUser);
    }, [searchedUser])

    //Open new window / tab whenever user clicks card
    const handleCardClick = (uuid) => {
        window.open(`/details/${uuid}`, "_blank");
    }


    if (sortTech === "Asort") {
        return <SortedData value={{ users, sortTech }} />
    }

    if (sortTech === "Dsort") {
        return <SortedData value={{ users, sortTech }} />
    }

    return (
        <div className='relative mt-5 lg:mt-20 h-screen w-full lg:w-[80%] m-auto flex flex-col items-center overflow-y-auto'>
            <h1 className='text-2xl font-bold my-4'>User Data Showcase</h1>

            {/* Showing the usual data */}

            {
                !searchButtton ?
                    users.length > 0 ? (
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                            {
                                currentUsers.length > 0 &&
                                currentUsers.map((user, index) => (
                                    <CardComponent uuid={user.login.uuid} key={user.login.uuid} user={user} />

                                ))}
                        </div>
                    ) :
                        // show Loader component till the data fetched 
                        (
                            <>
                                <LoaderPinwheel className='size-10 animate-spin' />
                                Loading...
                            </>
                        ) :

                    // If we found the data which user has searched, showing it here
                    (
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                            {
                                searchedUser.length > 0 ?
                                    searchedUser.map((user, index) => (
                                        <CardComponent ouuid={user.login.uuid} key={user.login.uuid} user={user} />
                                    )) :
                                    // If we dont find the data !!
                                    (
                                        <div className='flex justify-center flex-col w-full ml-auto md:ml-48 lg:ml-[26vw] h-36'>
                                            <SearchX className="size-28 m-auto text-gray-400" />
                                            <div className='text-center text-xl my-2'>
                                                No Records Found
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    )
            }

            {/* If the user has click on search button, view all will be visible */}
            {
                searchButtton ? (
                    <div className='h-auto w-auto'>
                        <button className='rounded-md px-2 border border-black text-lg' onClick={() => {
                            setSearchButtton(!searchButtton);
                            setInputValue("");
                        }}>View all</button>
                    </div>
                ) : null
            }

            {/* Pagination  */}
            <div className='flex justify-center items-center my-4'>
                <button className={`mx-2 border border-black py-1 px-2 rounded-lg`} onClick={() => paginate(currentPage > 1 && currentPage - 1)} disabled={currentPage === 1} >Prev</button>
                {
                    pageNumbers.map((number) => (
                        <button key={number} className={`text-lg px-2 border rounded-md mx-1 border-black bg-slate-300 ${number === currentPage ? 'text-red-500' : ''}`}
                            onClick={() => paginate(number)}>{number}</button>
                    )
                    )
                }
                <button className='mx-2 border border-black py-1 px-2  rounded-lg' onClick={() => paginate(currentPage < pageNumbers.length && currentPage + 1)} disabled={pageNumbers.length === currentPage}>Next</button>

            </div>

        </div>
    );
};

export default DataShowCasing;