'use client'
import { Tables } from "@/utils/supabase/database.types"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { EditPost } from "../../../../../../actions/edit-post"
import { postSchema } from "../../../../../../actions/schemas"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const EditForm = ({postId,initialValues}:{postId:number,initialValues:Pick<Tables<'posts'>,"title"|"content"|"image">}) => {
    
    const schemaWithImage = postSchema.omit({image:true}).
                                            extend({image:z.unknown().transform(value => 
                                            {return value as(FileList)}).optional()})
    
    const {register,handleSubmit} = useForm({
        resolver:zodResolver(schemaWithImage),
        defaultValues:{
            title:initialValues.title,
            content:initialValues.content || undefined,
            image:initialValues.image
        }
    })

    const {mutate,error} = useMutation({
        mutationFn: EditPost
    })
    
    return (
        <form onSubmit={handleSubmit(values => {
                                            let imageForm = undefined;
                                                    if(values.image?.length && typeof values.image !== 'string') {
                                                            console.log("values",typeof values.image)
                                                            imageForm= new FormData()
                                                            imageForm.append('image',values.image[0]) 
                                                        }
                                            mutate({postId, userdata:{title:values.title,content:values.content,image:imageForm}})})} className="flex flex-col mb-4">
           
            <fieldset className="m-4">
                <label htmlFor="title">Post Title</label>
                <input id="title" {...register("title")} className="ml-2 bg-gray-300 rounded-2xl p-2 mb-4" placeholder="What's your post called" />
            </fieldset>

              <fieldset className="m-4">
                <label htmlFor="image">Content</label>
                <textarea id="content" {...register("content")} className=" w-full ml-2 mb-4  bg-gray-300 rounded-2xl p-2 " placeholder="enter your content"/>
            </fieldset>

             <fieldset className="m-4">
                {initialValues.image && <img className="w-2xl h-auto" src={initialValues.image} alt="post image" />}
                <label htmlFor="image">Upload a new Image</label>
                <input type="file" id="image" {...register("image")}></input>               
            </fieldset>

            <fieldset>
                <button className="button-tertiary">Update Post</button>
                {error && <p>{error.message}</p>}
            </fieldset>
        </form>
    )
}

export default EditForm