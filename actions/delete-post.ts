'use server'

import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const DeletePost = async (postId : number) => {
    const supabase = await createClient() 

      // Check if user is authorized

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Not authorized")
        
    await supabase
                .from("posts")
                .delete()
                .eq('id',postId)
                .throwOnError()
                revalidatePath("/")
                redirect("/")
}