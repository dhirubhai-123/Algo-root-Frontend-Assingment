import React, { use, useEffect } from 'react';
import { useState } from 'react';
import { LoaderPinwheel } from 'lucide-react';
import { getData } from "./utils/myFunctions.js"
import { data } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import SideBar from './SideBar.jsx';

const Details = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { uuid } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Fetch user data by UUID (replace with your actual API call)
                const response = await fetch(`https://randomuser.me/api/?uuid=${uuid}`);
                const data = await response.json();
                setUser(data.results[0]);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [uuid]);

    useEffect(() => {
        toast.success("Data is dynamic, refreshing will change the Data")
    }, [])

    if (loading) {
        return <div className='w-full min-h-screen flex justify-center flex-col items-center m-auto bg-gray-50'>
            <LoaderPinwheel className='size-20 animate-spin' />
            <div className='text-2xl'>Getting the Details...</div>
        </div>
    }


    return (
        <div className='flex flex-row'>
            <SideBar />
            <div className="w-full min-h-screen p-4 bg-gray-50">

                <div className="max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-md overflow-hidden bg-white">
                    {/* Header Section */}
                    <div className="bg-blue-600 p-4 text-white">
                        <h1 className="text-2xl font-bold">
                            {user.name.title} {user.name.first} {user.name.last}
                        </h1>
                        <p className="text-blue-100">{user.email}</p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold border-b pb-2">Personal Information</h2>
                            <div>
                                <p className="text-gray-600">Gender</p>
                                <p className="capitalize">{user.gender}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Date of Birth</p>
                                <p>{new Date(user.dob.date).toLocaleDateString()} (Age: {user.dob.age})</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Phone</p>
                                <p>{user.phone}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Cell</p>
                                <p>{user.cell}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Nationality</p>
                                <p>{user.nat}</p>
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold border-b pb-2">Location</h2>
                            <div>
                                <p className="text-gray-600">Address</p>
                                <p>
                                    {user.location.street.number} {user.location.street.name}<br />
                                    {user.location.city}, {user.location.state}<br />
                                    {user.location.country}, {user.location.postcode}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Coordinates</p>
                                <p>Lat: {user.location.coordinates.latitude}, Long: {user.location.coordinates.longitude}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Timezone</p>
                                <p>{user.location.timezone.offset} - {user.location.timezone.description}</p>
                            </div>
                        </div>

                        {/* Login Information */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold border-b pb-2">Login Details</h2>
                            <div>
                                <p className="text-gray-600">Username</p>
                                <p>{user.login.username}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">UUID</p>
                                <p className="text-sm break-all">{user.login.uuid}</p>
                            </div>
                        </div>

                        {/* Profile Picture */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold border-b pb-2">Profile</h2>
                            <div className="flex flex-col items-center">
                                <img
                                    src={user.picture.large}
                                    alt={`${user.name.first} ${user.name.last}`}
                                    className="w-32 h-32 rounded-full border-4 border-blue-200"
                                />
                                <p className="mt-2 text-gray-600">ID: {user.id.name} - {user.id.value}</p>
                            </div>
                        </div>
                    </div>

                    {/* Registered Date */}
                    <div className="bg-gray-100 p-4 text-center">
                        <p className="text-gray-600">
                            Member since: {new Date(user.registered.date).toLocaleDateString()}
                            (for {user.registered.age} years)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;