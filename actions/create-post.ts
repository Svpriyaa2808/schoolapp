'use server'
import { createClient } from "@/utils/supabase/server-client"
import { postSchema } from "./schemas"
import z from "zod"
import { slugify } from "@/utils/slugify"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "@/utils/supabase/upload-image"

export const CreatePost = async (userdata:z.infer<typeof postSchema>) => {
    console.log("Image Parameter",userdata.image)
    
    const parsedData = postSchema.parse(userdata)
    const slug = slugify(parsedData.title)
  
    const imageFile = userdata.image?.get("image")
    console.log("image file",typeof imageFile)

    if(!(imageFile instanceof File) && imageFile !== null) {
        throw new Error("malformed image File")
    }
    
    const publicImageUrl = imageFile instanceof File ? await uploadImage(imageFile) : null

    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser();
    
   

    if(!user) {
        throw new Error("Not Authorized")
    }
   
    const userId = user.id;

    await supabase.from('posts')
                .insert([{user_id:userId,slug:slug,...parsedData,image:publicImageUrl}])
                .throwOnError()

                revalidatePath("/")
                redirect(`/${slug}`)
    }