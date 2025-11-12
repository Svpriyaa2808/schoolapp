'use server'

import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"


export const DeletePost = async (postId : number) => {
    const supabase = await createClient()

    // Check if user is authorized
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authorized")

    // Delete the post
    await supabase
                .from("posts")
                .delete()
                .eq('id',postId)
                .throwOnError()

    // Revalidate the home page cache
    revalidatePath("/")
}