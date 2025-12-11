import React from 'react';
import Navbar from './../components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer/Footer';

const AuthLayout = () => {
    return (
        <div>
          <header>
            <Navbar></Navbar>
           </header>
           <main className='w-9/12 mx-auto py-5'>
             <Outlet></Outlet>
           </main> 
           <footer>
            <Footer></Footer>
            </footer> 
        </div>
    );
};

export default AuthLayout;