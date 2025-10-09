'use client'
import { createClient } from "@/utils/supabase/browser-client";
import { getHomePosts, HomePostType } from "@/utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const HomePosts = ({posts}:{posts:HomePostType}) => {
    
    return (
        <div className= "flex flex-col gap-y-4">
            {posts && posts.map(({id,title,slug,users})=> 
            
                <Link href={`/${slug}`} className= "mt-[20px] block border-1 rounded-xl p-4" key={id}>
                    <h2 className="font-bold text-xl">{title}</h2>
                    <div className="text-right"> by {users.username}</div>
                </Link>
               
            )}
            
        </div>
    )
}

export default HomePosts