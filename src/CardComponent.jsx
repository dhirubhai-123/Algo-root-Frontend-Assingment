import React from 'react'

const CardComponent = ({ user, uuid }) => {

    const handleCardClick = (uuid) => {
        window.open(`/details/${uuid}`, "_blank");
    }

    return (
        <div key={user.login.uuid} className='border border-gray-300 rounded-lg p-4 shadow-md hover:cursor-pointer' onClick={() => handleCardClick(uuid)}>
            <div className='flex items-center mb-3 overflow-hidden'>
                <img
                    src={user.picture.medium}
                    alt={`${user.name.first} ${user.name.last}`}
                    className='w-16 h-16 rounded-full mr-4'
                />
                <div>
                    <h2 className='font-semibold'>{user.name.title} {user.name.first} {user.name.last}</h2>
                    <p className='text-sm text-gray-600'>{user.email}</p>
                </div>
            </div>

            <div className='space-y-2'>
                <p><span className='font-medium'>Location:</span> {user.location.city}, {user.location.country}</p>
                <p><span className='font-medium'>Age:</span> {user.dob.age}</p>
                <p><span className='font-medium'>Phone:</span> {user.phone}</p>
                <p><span className='font-medium'>Registered:</span> {new Date(user.registered.date).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default CardComponent