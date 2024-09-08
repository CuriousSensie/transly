import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authcontext';
import { doSignOut } from '../../firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const handleSignOut = async () => {
        try {
            await doSignOut();
            navigate('/login');
        } catch (error) {
            console.error('Sign out error:', error);
            // Optionally, you could show an error message to the user here
        }
    };

    return (
        <nav className="flex flex-row gap-x-4 w-full z-20 fixed top-0 left-0 h-12 border-b bg-gray-200 items-center px-4 shadow-md">
            {/* Logo and App Name (Optional) */}
            <h1 className="flex-grow">
                <Link to="/" className="text-lg font-bold">
                    <span className='text-blue-950 bold'>T</span>
                    <span className='text-blue-900 bold'>R</span>
                    <span className='text-blue-800 bold'>A</span>
                    <span className='text-blue-700 bold'>N</span>
                    <span className='text-blue-600 bold'>S</span>
                    <span className='text-blue-500 bold'>L</span>
                    <span className='text-blue-400 bold'>Y</span>
                </Link>
            </h1>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-x-4">
                {userLoggedIn ? (
                    <button 
                        onClick={handleSignOut} 
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span>Log Out</span>
                    </button>
                ) : (
                    <>
                        <Link 
                            className="text-sm text-blue-600 border-2  rounded-md px-4 py-1 hover:text-blue-800 hover:bg-blue-100 ml-4" 
                            to="/login"
                        >
                            Login
                        </Link>
                        <Link 
                            className="text-sm text-blue-600 border-2 rounded-md px-4 py-1 hover:text-blue-800 hover:bg-blue-100 ml-4" 
                            to="/register"
                        >
                            Register New Account
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
