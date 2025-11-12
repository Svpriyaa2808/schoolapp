import { getSinglePost } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import Comments from "@/components/comments"
import CommentSection from "@/components/comments/CommentSection"

const singlePost =async ({params}:{params:{slug:string}}) => {
    const {slug} = await params
    const {data,error} = await getSinglePost(slug)

    const supabase= await createClient()
    const {data:{user}} = await supabase.auth.getUser();

    const isAuthor = user?.id === data?.user_id ? true : false

    return (
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
           {data &&
           <>
            {/* Post Header */}
            <div className="card p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeInUp">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">{data.title}</h1>
                <div className="flex items-center gap-2 sm:gap-3 pb-4 sm:pb-6 border-b border-gray-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-xl flex-shrink-0">
                        {data.users?.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm text-gray-600">Written by</p>
                        <p className="font-semibold text-sm sm:text-base text-gray-900">{data.users?.username}</p>
                    </div>
                </div>
            </div>

            {/* Post Image */}
            {data?.image &&
                <div className="card p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-auto rounded-xl shadow-lg"
                    />
                </div>
            }

            {/* Post Content */}
            <div className="card p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                {data.content &&
                    <div className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {data.content}
                    </div>
                }
            </div>

            {/* Author Actions */}
            {isAuthor &&
                <div className="card p-4 sm:p-6 mb-4 sm:mb-6 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-semibold">Manage Your Post</p>
                    <div className="flex gap-2 sm:gap-3 flex-wrap">
                        <EditButton slug={slug}/>
                        <DeleteButton postId={data.id}/>
                    </div>
                </div>
            }

            {/* Comment Section */}
            {user && <CommentSection slug={slug} user_id={data.user_id} id={data.id}/>}

            {/* Comments List */}
            {data.comments && (
                <Comments
                    comments={data.comments}
                    currentUserId={user?.id}
                    postAuthorId={data.user_id}
                    slug={slug}
                />
            )}

            </>
           }
        </div>
    )

}

export default singlePost
