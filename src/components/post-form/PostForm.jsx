import React, { useCallback } from 'react';
import  service  from '../../appwrite/dbService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export function PostForm({ post }) {

  const userData = useSelector(state => state.auth.userData);
  const navigate = useNavigate();
  const {register, handleSubmit, setValue, getValue,control,  watch} = useForm({
    title: post?.title || "", 
    slug: post?.slug || "", 
    content: post?.content || "",
    status: post?.status || "active"
  });



  const submit = async (data) => {
    if (post) {
      const file = await data?.image[0]? service.uploadFile(data?.image):null

      if (file) {
        await service.deleteFile(post.featuredImage);
      }

      const updatedPost = await service.updatePost(post?.$id, { ...data,
        featuredImage: file ? file.$id : undefined,
      
      });

      if(updatedPost){
        navigate(`/posts/${post?.$id}`)
      }
    }

    if (!post) {
      const file = await service.uploadFile(data?.image);

      if(file){
        const fileId = file.$id
        post.featuredImage = fileId
        
      }

      
      const createdPost = await service.createPost({...data , userId: userData.$id} )
      

      if(createdPost){
        navigate(`posts/${createdPost.$id}`)
      }
    }
  };

  const slugTransform = useCallback((value)=> {
    if(value && typeof value === 'string'){
      const slug = value.toLowerCase().replace(/ /g, '-')
      
      setValue('sulg', slug)

      return slug;
    }
  } , [slug])

  useEffect(()=> {
      const subscription = watch((value, {name}) => {
        if(name === 'title'){
          setValue('title', slugTransform(value.title)), { shouldValidate: true }
        }
      })

      return subscription.unsubscribe()
  } , [navigate, slug, setValue])


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  );
}
