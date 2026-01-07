import React from 'react'
import { Link } from 'react-router'
import { ShoppingBagIcon, PlusIcon, UserIcon } from 'lucide-react'
import ThemeSelector from './ThemeSelector.jsx'

const Navbar = () => {

    const isSignedIn = true; // need to cheange in the login and logout also


    return (
        <div className='navbar bg-base-300' >
            <div className='max-w-5xl mx-auto w-full px-4 flex justify-between items-center'>
                {/* Left Side - Logo */}
                <div className='flex-1'>
                    <Link to='/' className='btn btn-ghost gap-2'>
                        <ShoppingBagIcon className='size-5 text-primary' />
                        <span className='text-lg font-bold font-mono uppercase
                        tracking-wider
                        '>Shop</span>
                    </Link>
                </div>


                {/* Right Side - Links */}
                <div className='flex items-center gap-2'>
                    <ThemeSelector />
                    {isSignedIn ? (
                        <>
                            <Link to='/create' className='btn btn-primary btn-sm gap-1'>
                                <PlusIcon className='size-4' />
                                <span className='hidden sm:inline'> New Product</span>
                            </Link>
                            <Link to="/profile" className="btn btn-ghost btn-sm gap-1">
                                <UserIcon className="size-4" />
                                <span className="hidden sm:inline">Profile</span>
                            </Link>

                        </>
                    ) : (
                        <>
                            <Link to='/login' className='btn btn-cupcake btn-sm'>
                                Sign in
                            </Link>
                            <Link to='/register' className='btn btn-primary btn-sm'>
                                Sign up
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </div>

    )
}
export default Navbar;