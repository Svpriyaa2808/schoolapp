'use client'
import { createClient } from "@/utils/supabase/browser-client";
import { getHomePosts, HomePostType } from "@/utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const HomePosts = ({posts}:{posts:HomePostType}) => {

    return (
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center mb-6 sm:mb-8 animate-fadeInUp drop-shadow-sm">
                ✨ Latest Posts
            </h1>
            <div className="flex flex-col gap-4 sm:gap-6">
                {posts && posts.map(({id,title,slug,users}, index)=>
                    <Link
                        href={`/${slug}`}
                        className="card p-4 sm:p-6 group animate-fadeInUp hover:bg-white"
                        key={id}
                        style={{animationDelay: `${index * 0.1}s`}}
                    >
                        <h2 className="font-bold text-xl sm:text-2xl text-gray-800 group-hover:text-purple-600 transition-colors duration-300 mb-3 sm:mb-4">
                            {title}
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                                    {users.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Written by</p>
                                    <p className="font-semibold text-sm sm:text-base text-gray-800">{users.username}</p>
                                </div>
                            </div>
                            <div className="text-purple-600 font-semibold text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300 self-end sm:self-center">
                                Read more →
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default HomePosts
