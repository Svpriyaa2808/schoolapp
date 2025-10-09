import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";

export const EditPost =async ({postId,userdata}:{postId:number,userdata:z.infer<typeof postSchema>}) => {
    const parsedData = postSchema.parse(userdata)
    
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()
    
    const {data: post,error} = await supabase.from('posts')
                                                .select('*')
                                                .eq('id',postId)
                                                .single()

    if(!user || user.id !== post?.user_id) throw new Error("Not Authorised")
    
    const {data:updatePost} = await supabase.from('posts')
                                            .update({...parsedData})
                                            .eq('id',postId)
                                            .select('slug')
                                            .throwOnError()

}