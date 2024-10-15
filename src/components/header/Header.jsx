import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authcontext';
import { doSignOut } from '../../firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faPlus} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Header = (props) => {
    const {handleAudioReset} = props
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const handleNew = () => {
        Swal.fire({
            title: "Start with a new Audio?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Confirm",
            denyButtonText: `Cancel`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                console.log("Resetting the conditionals");

                handleAudioReset();

            } else if (result.isDismissed) {
                // do nothing
            }
          });
    }

    const handleSignOutAction = () => {
        Swal.fire({
            title: "Logout?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Confirm",
            denyButtonText: `Cancel`
          }).then((result) => {
            if (result.isConfirmed) {
                console.log("Logging Out");

                handleAudioReset();

                handleSignOut();
            } else if (result.isDismissed) {
                // do nothing
            }
        });
    }

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
            <h1 className="flex-grow hover:cursor-pointer">
                <p onClick={() => {
                    handleAudioReset()
                }} className="text-lg font-bold">
                    <span className='text-blue-950 bold'>T</span>
                    <span className='text-blue-900 bold'>R</span>
                    <span className='text-blue-800 bold'>A</span>
                    <span className='text-blue-700 bold'>N</span>
                    <span className='text-blue-600 bold'>S</span>
                    <span className='text-blue-500 bold'>L</span>
                    <span className='text-blue-400 bold'>Y</span>
                </p>
            </h1>
            <button onClick={handleNew} className="special-btn flex items-center text-blue-700 rounded gap-2 px-4 py-2 ">
            <FontAwesomeIcon icon={faPlus} />
            
          </button>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-x-4">
                {userLoggedIn ? (
                    <button 
                        onClick={handleSignOutAction} 
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
