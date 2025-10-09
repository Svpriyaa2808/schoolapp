// 'use server'
// import z from "zod";
// import { postSchema } from "./schemas";
// import { createClient } from "@/utils/supabase/server-client";
// import { slugify } from "@/utils/slugify";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { uploadImage } from "@/utils/supabase/upload-image";

// export const EditPost =async ({postId,userdata}:{postId:number,userdata:z.infer<typeof postSchema>}) => {
//     console.log("Image param",userdata.image,"type",typeof userdata.image)
//     const parsedData = postSchema.parse(userdata)
    
//         const imageFile = userdata.image?.get("image")
//         console.log("image file",typeof imageFile)

//     let publicImageUrl

//         if(typeof imageFile !== 'string' && imageFile !== undefined) {
//             if(!(imageFile instanceof File) && imageFile !== null) {
//             throw new Error("malformed image File")
//             }

//             publicImageUrl =  await uploadImage(imageFile!)
//         }else {
//             publicImageUrl = imageFile
//         }
       
//     const supabase = await createClient()
//     const {data: {user}} = await supabase.auth.getUser()
    
//     const {data: post,error} = await supabase.from('posts')
//                                                 .select('*')
//                                                 .eq('id',postId)
//                                                 .single()

//     if(!user || user.id !== post?.user_id) throw new Error("Not Authorised")
    
//     const {data:updatedPost} = await supabase.from('posts')
//                                             .update({...parsedData,image:publicImageUrl, slug: slugify(parsedData.title)})
//                                             .eq('id',postId)
//                                             .select('slug')
//                                             .single()
//                                             .throwOnError()

//     if(error) throw error
//     revalidatePath("/")
//     redirect(`/${updatedPost.slug}`)

// }

'use server';

import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";
import { slugify } from "@/utils/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/utils/supabase/upload-image";

export const EditPost = async ({ postId, userdata }: { postId: number; userdata: z.infer<typeof postSchema> }) => {
    const parsedData = postSchema.parse(userdata);

    const imageFile = userdata.image;
    let publicImageUrl: string | null | undefined;

    if (imageFile && typeof imageFile !== 'string') {
        if (!(imageFile instanceof File)) {
            throw new Error("Malformed image file");
        }

        publicImageUrl = await uploadImage(imageFile);
    } else {
        publicImageUrl = imageFile; // might be existing image URL or null
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single()
        .throwOnError();

    if (!user || user.id !== post.user_id) {
        throw new Error("Not authorized");
    }

    const { data: updatedPost } = await supabase
        .from('posts')
        .update({
            ...parsedData,
            image: publicImageUrl,
            slug: slugify(parsedData.title),
        })
        .eq('id', postId)
        .select('slug')
        .single()
        .throwOnError();

    revalidatePath("/");
    redirect(`/${updatedPost.slug}`);
};
