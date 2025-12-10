import React, { useEffect, useState } from 'react';
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow';
import axios from 'axios';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';

const ManageUsers = () => {
    // 1. State for storing all users and loading status
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Function to fetch all users from the backend
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // ✅ NEW API: Apnake backend-e ekti '/users' API toiri korte hobe
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
            setUsers(response.data);

        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div className='text-center py-8 text-xl'><LoadingSpinner></LoadingSpinner></div>;
    }

    return (
        <>
            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <h2 className='text-2xl font-semibold leading-tight mb-4'>Manage All Users ({users.length})</h2>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        {/* TABLE HEADERS REMAINS SAME */}
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Name</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Email</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Role</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Status</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* 3. FIX: Map over the users array and pass each user object */}
                                    {users.map(user => (
                                        <UserDataRow 
                                            key={user._id} 
                                            user={user} // ✅ User object pass kora holo
                                            refetch={fetchUsers} // ✅ Role change er por data reload korar jonno
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;