import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import  service  from '../appwrite/dbService'
import {PostForm} from '../components/post-form/PostForm'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container/Container'


function EditPost() {

    const {slug} = useParams();
    const navigate = useNavigate()
    const [post, setPost] = useState(null);

    useEffect(()=>{
       if(slug){
        service.getPost(slug).then((post) => {
            if(post){
                setPost(post);
            }
        })
       }
       else{
        navigate('/')
       }
    }, [slug, navigate])
    
  return post? (
    <Container>
        <div>
            <PostForm post = {post} />
        </div>
    </Container>
  ): null;
}

export default EditPost
