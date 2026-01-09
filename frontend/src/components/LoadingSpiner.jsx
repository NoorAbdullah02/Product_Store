import React from 'react'
import { LoaderIcon } from 'lucide-react'

const LoadingSpiner = () => {
    return (
        <div className='flex flex-col items-center justify-between
    py-20 gap-4'>
            <LoaderIcon className='size-10 text-primary animate-bounce' />
            <p className='text-sm text-base-content/50'>Loading...</p>
        </div>
    )
}

export default LoadingSpiner;