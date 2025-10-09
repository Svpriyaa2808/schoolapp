import { getSinglePost } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"

const singlePost =async ({params}:{params:{slug:string}}) => {
    const {slug} = await params
    const {data,error} = await getSinglePost(slug)

    const supabase= await createClient()
    const {data:{user}} = await supabase.auth.getUser();
    
    const isAuthor = user?.id === data?.user_id ? true : false
    
    return (
        <div>
           {data && 
           <>
            <div className="w-2xl p-4 m-auto mt-4 border-gray-700 border rounded-2xl">
            <h2>{data.title}</h2>
            <p className="mt-4">Author {data.users?.username}</p>
            </div>
             {data?.image && <div className="w-lg m-auto p-4 mt-4 border-gray-700 border rounded-2xl">
               <img src={data.image} width="75%" height="auto" />
            </div>}
            <div className="w-2xl m-auto p-4 mt-4 border-gray-700 border rounded-2xl">
                {data.content && <div>{data.content}</div>}
            </div>
            {isAuthor && 
            <div className="w-2xl m-auto p-4 mt-4 border border-gray-700 rounded-2xl">
                <DeleteButton postId={data.id}/>
                <EditButton slug={slug}/>
            </div>
            }       
            </>
           }
        </div>
    )

}

export default singlePost