'use client'
import { Tables } from "@/utils/supabase/database.types"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { EditPost } from "../../../../../../actions/edit-post"
import ErrorMessage from "@/components/ErrorMessage"

const EditForm = ({postId,initialValues}:{postId:number,initialValues:Pick<Tables<'posts'>,"title"|"content">}) => {
    
    const {register,handleSubmit} = useForm({
        defaultValues:{
            title:initialValues.title,
            content:initialValues.content
        }
    })

    const {mutate,error} = useMutation({
        mutationFn: EditPost
    })
    
    return (
        <form onSubmit={handleSubmit(values => mutate(postId:values))} className="flex flex-col mb-4">
           
            <fieldset className="m-4">
                <label htmlFor="title">Post Title</label>
                <input id="title" {...register("title")} className="ml-2 bg-gray-300 rounded-2xl p-2 mb-4" placeholder="What's your post called" />
        
            </fieldset>

              <fieldset className="m-4">
                <label htmlFor="content">Content</label>
                <textarea id="content" {...register("content")} className=" w-full ml-2 mb-4  bg-gray-300 rounded-2xl p-2 " placeholder="enter your content"/>
                
            </fieldset>
            <fieldset>
                <button className="button-tertiary">Update Post</button>
                {error && <p>{error.message}</p>}
            </fieldset>
        </form>
    )
}

export default EditForm