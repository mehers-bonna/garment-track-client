import React, { useEffect, useState, useMemo } from 'react';
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow';
import axios from 'axios';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const fetchUsers = async () => {
        setLoading(true);
        try {
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
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.role.toLowerCase().includes(searchTerm.toLowerCase());
            let matchesStatus = true;
            if (filterStatus !== 'All') {
                matchesStatus = user.status === filterStatus; 
            }
            
            return matchesSearch && matchesStatus;
        });
    }, [users, searchTerm, filterStatus]);

    if (loading) {
        return <div className='text-center py-8 text-xl'><LoadingSpinner /></div>;
    }

    return (
        <>
            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <h2 className='text-2xl font-semibold leading-tight mb-4'>Manage All Users ({filteredUsers.length} of {users.length})</h2>
                    <div className='flex flex-wrap gap-4 mb-6 items-center'>
                        <div className='relative flex-1 min-w-[200px]'>
                            <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                <svg className='w-5 h-5 text-gray-400' viewBox='0 0 24 24' fill='none'>
                                    <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'></path>
                                </svg>
                            </span>
                            <input
                                type='text'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder='Search by Role (e.g., admin, manager)'
                                className='w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-[#442C2E] focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-[#442C2E]'
                            />
                        </div>
                        <div className='flex-shrink-0'>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className='py-2 px-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-[#442C2E] focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-[#442C2E]'
                            >
                                <option value='All'>Filter by Status: All</option>
                                <option value='pending'>Pending</option>
                                <option value='suspended'>Suspended</option>
                            </select>
                        </div>
                    </div>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Name</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Email</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Role</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Status</th>
                                        <th scope='col' className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <UserDataRow 
                                            key={user._id} 
                                            user={user} 
                                            refetch={fetchUsers} 
                                        />
                                    ))}
                                    
                                    {filteredUsers.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="py-4 text-center text-gray-500 bg-white border-b border-gray-200">
                                                No users match the current search or filter criteria.
                                            </td>
                                        </tr>
                                    )}
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