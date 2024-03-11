import React from 'react'
import { useParams } from 'react-router-dom'

export function User() {
    
    const {userid} = useParams(); 
    return (
        <>
            <div className='bg-gray-400 text-white-3xl p-4'>
                User:{userid}
            </div>
        </>
    )
}
