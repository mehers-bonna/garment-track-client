import React, { useEffect, useState, useMemo } from 'react';
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow';
import LoadingSpinner from './../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const axiosSecure = useAxiosSecure();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosSecure.get(`/users`);
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
        return <div className='flex justify-center items-center h-64'><LoadingSpinner /></div>;
    }

    return (
        <>
            <div className='container mx-auto px-4 sm:px-8 transition-colors duration-300 mb-12'>
                <div className='py-8'>
                    <h2 className='text-2xl font-semibold leading-tight mb-4 text-gray-800 dark:text-gray-100'>
                        Manage All Users ({filteredUsers.length} of {users.length})
                    </h2>
                    
                    <div className='flex flex-wrap gap-4 mb-6 items-center'>
                        {/* Search Input */}
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
                                className='w-full py-2 pl-10 pr-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg focus:border-[#442C2E] dark:focus:border-[#D6A99D] focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-[#442C2E]'
                            />
                        </div>

                        {/* Filter Select */}
                        <div className='flex-shrink-0'>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className='py-2 px-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg focus:border-[#442C2E] dark:focus:border-[#D6A99D] focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-[#442C2E] transition-colors'
                            >
                                <option value='All' className='dark:bg-[#1a1a1a]'>Filter by Status: All</option>
                                <option value='pending' className='dark:bg-[#1a1a1a]'>Pending</option>
                                <option value='suspended' className='dark:bg-[#1a1a1a]'>Suspended</option>
                            </select>
                        </div>
                    </div>

                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden border dark:border-gray-800'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr className='hidden md:table-row'>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>Name</th>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>Email</th>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>Role</th>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>Status</th>
                                        <th scope='col' className='px-5 py-3 bg-gray-100 dark:bg-[#262626] border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-semibold'>Action</th>
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
                                            <td colSpan="5" className="py-10 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 font-medium">
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