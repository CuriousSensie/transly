import React, { useState } from 'react';
import Logo from '../assets/google.svg';

export default function Form() {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => setIsSignup(!isSignup);

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-gray-200 border-2 shadow-lg max-w-md mx-auto">
      <h1 className="text-5xl font-semibold text-center mb-4">
        Welcome to Transly!
      </h1>
      <p className="font-medium text-lg text-gray-500 text-center mb-8">
        {isSignup ? 'Create an account or' : 'Login or'} use our services.
      </p>
      <form>
        <div className="mb-6">
          <label htmlFor="email" className="text-lg font-medium block mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your Email"
            className="w-full border-2 border-gray-100 rounded-xl p-4 bg-transparent"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="text-lg font-medium block mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your Password"
            className="w-full border-2 border-gray-100 rounded-xl p-4 bg-transparent"
            required
          />
        </div>
        {isSignup && (
          <div className="mb-6">
            <label htmlFor="confirm-password" className="text-lg font-medium block mb-2">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm your Password"
              className="w-full border-2 border-gray-100 rounded-xl p-4 bg-transparent"
              required
            />
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="ml-2 font-medium text-base">
              Remember Me
            </label>
          </div>
          <button className="text-blue-500 hover:underline focus:outline-none">
            Forgot password?
          </button>
        </div>
        <div className="flex flex-col gap-y-4 mb-6">
          <button
            type="submit"
            className="active:scale-95 active:transition-all active:duration-75 hover:scale-105 bg-blue-500 text-white py-3 rounded-xl transition-transform"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
          <button
            type="button"
            className="active:scale-95 active:transition-all active:duration-75 hover:scale-105 flex items-center justify-center gap-2 border-2 border-gray-300 py-3 rounded-xl"
          >
            <img height={24} width={24} src={Logo} alt="Google logo" />
            Sign In with Google
          </button>
        </div>
        <p className="text-center text-gray-600">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-500 hover:underline ml-2"
          >
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
}
