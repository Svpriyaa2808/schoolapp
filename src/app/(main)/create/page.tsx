'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { postSchema } from "../../../../actions/schemas"
import { useMutation } from "@tanstack/react-query"
import { CreatePost } from "../../../../actions/create-post"
import ErrorMessage from "@/components/ErrorMessage"
import z from "zod"

const CreatePage = () => {

    const schemaWithImage = postSchema.omit({image:true}).
                                        extend({image:z.unknown().transform(value => 
                                        {return value as(FileList)}).optional()})

    const {register,handleSubmit,formState : {errors}} = useForm ({
        resolver:zodResolver(schemaWithImage) 
    })

    const {mutate,error} = useMutation({
        mutationFn:CreatePost
    })

    return (
        <div className="border-1 rounded-xl  p-4  w-[700px] mx-auto ">
        <h4 className="font-bold text-3xl mb-4">Got something to say</h4>
        <form className="flex flex-col m-4 " onSubmit={handleSubmit(values =>{
                                                        let imageForm = new FormData();
                                                        if(values.image?.length) {
                                                            imageForm.append('image',values.image[0]) 
                                                        }
                                                        mutate({title:values.title,content:values.content,image:imageForm})
                                                        })}>
         
            <fieldset className="m-4">
                <label htmlFor="title">Post Title</label>
                <input id="title" className="ml-2 bg-gray-300 rounded-2xl p-2 mb-4" {...register("title")} placeholder="What's your post called"/>
            </fieldset>

              <fieldset className="m-4">
                <label htmlFor="content">Content</label>
                <textarea id="content"  {...register("content")} className=" w-full ml-2 mb-4  bg-gray-300 rounded-2xl p-2 " placeholder="enter your content"/>
                
            </fieldset>

             <fieldset className="m-4">
                <label htmlFor="image">Upload an Image</label>
                <input type="file" id="image"  {...register("image")} className=" w-full ml-2 mb-4  bg-gray-300 rounded-2xl p-2 " placeholder="Upload picture"/>           
                {errors.image && <ErrorMessage message={errors.image.message!} />}
            </fieldset>

            <button className="button-secondary w-1/2 m-auto">Create Post</button>
        </form>
   
        </div>
    ) 
}

export default CreatePage