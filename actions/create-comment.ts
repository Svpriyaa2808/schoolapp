// 'use server'
// import { createClient } from "@/utils/supabase/server-client"
// import { commentSchema } from "./schemas"
// import z from "zod"
// import { revalidatePath } from "next/cache"
// import { redirect } from "next/navigation"
// import { slugify } from "@/utils/slugify"


// export const CreateComment = async (userdata:z.infer<typeof commentSchema> ) => {
 
//     const parsedData = commentSchema.parse(userdata)

//     const supabase = await createClient()
//     const {data:{user}} = await supabase.auth.getUser();
    
   

//     if(!user) {
//         throw new Error("Not Authorized")
//     }

//     const slug = parsedData.slug
//     console.log(slug)
//     await supabase.from('comments')
//                 .insert([{slug:parsedData.slug,commentor_name:parsedData.username ,comment_section: parsedData.comment_section}])
//                 .throwOnError()
//                   revalidatePath("/")
//                 redirect(`/${slug}`)
              
                
//     }

// /actions/create-comment.ts
'use server'
import { createClient } from "@/utils/supabase/server-client"
import { commentSchema } from "./schemas"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// export const CreateComment = async ({ comment_section, slug,id }: { comment_section: string;id:number,slug: string }) => {
//   const parsedData = commentSchema.parse({ comment_section})
//   console.log(parsedData)
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()

//   if (!user) {
//     throw new Error("Not Authorized")
//   }

//   const { data: profile } = await supabase
//     .from("users")
//     .select('username,id')
    
//     .single()

//   await supabase.from("comments")
//                 .insert([{slug,id,comment_section: parsedData.comment_section,commentor_name: profile?.username || "Anonymous",user_id: profile?.id||"undefined"},])
//                 .throwOnError()
//                 revalidatePath(`/${slug}`)
               
// }

// export const CreateComment = async ({ comment_section, slug, id }: { comment_section: string; id: number; slug: string }) => {
//   try {
//     console.log("1. Action triggered", { comment_section, slug, id })

//     const parsedData = commentSchema.parse({ comment_section })
//     console.log("2. Zod parsed:", parsedData)

//     const supabase = await createClient()
//     const { data: { user } } = await supabase.auth.getUser()
//     console.log("3. Current user:", user)

//     if (!user) throw new Error("Not Authorized")

//     const { data: profile, error: profileError } = await supabase
//       .from("users")
//       .select("username,id")
//       .single()

//     console.log("4. Fetched profile:", profile, "Error:", profileError)

//     const insertRes = await supabase.from("comments").insert([
//       {
//         slug,
//         id,
//         comment_section: parsedData.comment_section,
//         commentor_name: profile?.username || "Anonymous",
//         user_id: profile?.id || "undefined"
//       }
//     ])
//     console.log("5. Insert result:", insertRes)

//     revalidatePath(`/${slug}`)
//     console.log("6. Revalidated page")
    
//   } catch (err) {
//     console.error("🔥 ERROR IN CreateComment:", err)
//     throw err // keep this so React Query detects the failure
//   }
// }

export const CreateComment = async ({
  comment_section,
  slug,
  id
}: {
  comment_section: string,
  id: number,
  slug: string
}) => {
  try {
    const parsedData = commentSchema.parse({ comment_section })

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Not Authorized")

    // ✅ FIX: Only fetch profile for current user
    const { data: profile } = await supabase
      .from("users")
      .select("username,id")
      .eq("id", user.id) // ✅ IMPORTANT FIX
      .single()

    await supabase
      .from("comments")
      .insert([
        {
          slug,comment_section: parsedData.comment_section,commentor_name: profile?.username || "Anonymous",user_id: profile?.id||"Anonymous" // ✅ Will now be a real UUID
        }
      ])
      .throwOnError()

    revalidatePath(`/${slug}`)
  } catch (err) {
    console.error("🔥 ERROR IN CreateComment:", err)
    throw err
  }
}
