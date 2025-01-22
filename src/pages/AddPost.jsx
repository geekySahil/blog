import React from 'react'
import { Container } from '../components';
import { PostForm } from '../components/post-form/PostForm';

function AddPost() {
  return (
    <Container>
        <PostForm post = {post}/>
    </Container>
  )
}

export default AddPost;
