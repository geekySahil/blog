import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import service from '../appwrite/dbService'

function PostCard({
    featuredImage,
    $id,
    className = "",
    title

}) {
    return (
        <Link to={`/${title}`} >

            <div className='bg-gray-100  w-full rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
                </div>
                <h2>{title}</h2>
            </div>
        </Link>

    )
}

export {PostCard}

export default PostCard
