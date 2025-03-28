import React, { useContext, useEffect, useState } from 'react'
import { LoaderPinwheel } from 'lucide-react'
import { searchInput, searchButton, sortTechnique } from './context/context';
import CardComponent from './CardComponent';

const SortedData = ({ value }) => {
    const { users: originalUsers, sortTech } = value;
    const { inputValue, setInputValue } = useContext(searchInput);
    const { searchButtton, setSearchButtton } = useContext(searchButton);
    const [sortedUsers, setSortedUsers] = useState(originalUsers);
    const [searchedUser, setSearchedUser] = useState();

    const sortUsersByAge = () => {
        const sorted = [...originalUsers].sort((a, b) => {
            if (sortTech === 'Asort') {
                return a.dob.age - b.dob.age; // Ascending order
            } else {
                return b.dob.age - a.dob.age; // Descending order
            }
        });
        setSortedUsers(sorted);
    };

    useEffect(() => {
        if (sortTech.trim().length > 0) {
            //sort only if user is selected something
            sortUsersByAge();
        } else {
            // Reset to original order when no sort is selected
            setSortedUsers(originalUsers);
        }
    }, [sortTech, originalUsers]);

    useEffect(() => {
        const handleSearch = () => {
            const user = sortedUsers.filter(record => record.name.first.trim().toLowerCase() === inputValue.trim().toLowerCase() || record.name.last.trim().toLowerCase() === inputValue.trim().toLowerCase())
            // console.log(user)
            setSearchedUser(user);
        }
        handleSearch();
    }, [searchButtton])

    return (
        <div className='relative mt-5 lg:mt-20 h-screen w-full lg:w-[80%] m-auto flex flex-col items-center overflow-y-auto'>
            <h1 className='text-2xl font-bold my-4'>User Data - {sortTech == "Asort" ? "Ascending" : "Descending"}</h1>
            {
                !searchButtton ?
                    sortedUsers.length > 0 ? (
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                            {sortedUsers.map((user) => (
                                <CardComponent
                                    onClick={() => handleCardClick(user.login.uuid)}
                                    key={user.login.uuid}
                                    user={user}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <LoaderPinwheel className='size-10 animate-spin' />
                            Loading...
                        </>
                    ) :
                    (
                        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                            {searchedUser.map((user) => (
                                <CardComponent
                                    onClick={() => handleCardClick(user.login.uuid)}
                                    key={user.login.uuid}
                                    user={user}
                                />
                            ))}
                        </div>
                    )
            }

            {searchButtton && (
                <div className='h-auto w-auto'>
                    <button
                        className='rounded-md px-2 border border-black text-lg'
                        onClick={() => {
                            setSearchButtton(!searchButtton);
                            setInputValue("");
                        }}
                    >
                        View all
                    </button>
                </div>
            )}
        </div>
    )
}

export default SortedData;