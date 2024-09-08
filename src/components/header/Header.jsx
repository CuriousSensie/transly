import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authcontext';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const handleSignOut = async () => {
        try {
            await doSignOut();
            navigate('/login');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <nav className="flex flex-row gap-x-4 w-full z-20 fixed top-0 left-0 h-12 border-b bg-gray-200 items-center px-4 shadow-md">
            {/* Logo and App Name (Optional) */}
            <div className="flex-grow">
                <Link to="/" className="text-lg font-bold text-blue-700">Transly</Link>
            </div>
            
            {/* Navigation Links */}
            <div className="flex space-x-4">
                {userLoggedIn ? (
                    <>
                        <button 
                            onClick={handleSignOut} 
                            className="text-sm text-blue-600 underline hover:text-blue-800"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            className="text-sm text-blue-600 underline hover:text-blue-800" 
                            to="/login"
                        >
                            Login
                        </Link>
                        <Link 
                            className="text-sm text-blue-600 underline hover:text-blue-800" 
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
