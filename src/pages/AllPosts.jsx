import React, { useEffect, useState } from 'react'
import Container from '../components/Container/Container'
import  service  from '../appwrite/dbService'
import { PostCard } from '../components';


function AllPosts() {

    const [posts, setPosts] = useState([]);

    useEffect(async()=>{
        await service.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })
    }, [posts])



  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {posts.map((post)=> {
                <div key = {post.$id} className="p-2 w-1/4">
                    <PostCard post = {post }/>
                </div>
            })}

        </div>
        
      </Container>
    </div>
  )
}

export default AllPosts
