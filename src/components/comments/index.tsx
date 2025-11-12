// type commentProps = {
//     comment_section : string ,
//     commentor_name : string,
//     id: number
// }

// type CommentArray = {
//     comments:commentProps[]
// }

// const Comments = ({comments}:CommentArray) => {
//     return (
//         <div>
//             <h4>Comments</h4>
//             {comments.map((item,index)=><div key={index}>
//                 <p>{item.id}</p>
//                 <p>{item.commentor_name}:{item.comment_section}</p>
//                 </div>)
                
//              }
            
//         </div>
//     )
// }

// export default Comments


// components/comments/index.tsx or wherever Comments component is located
'use client'
import { useMutation } from "@tanstack/react-query"
import { deleteComment } from "../../../actions/delete-comment"
import { useTransition } from "react"
import { DeletePost } from "../../../actions/delete-post"

type commentProps = {
  comment_section: string
  commentor_name: string
  id: number
  user_id: string
}

type CommentArray = {
  comments: commentProps[]
  currentUserId: string | undefined
  postAuthorId: string
  slug: string
}

const Comments = ({ comments, currentUserId, postAuthorId, slug }: CommentArray) => {
//   const [isPending, startTransition] = useTransition()

  const handleDelete = (id: number,slug:string) => {
      deleteComment(id, slug)
      console.log("itemid",id)
  }
  console.log("currentuser",currentUserId)
    console.log("post",postAuthorId)
  const {mutate,isPending,error} = useMutation({
        mutationFn:DeletePost,
      
    })
    console.log("userid",comments)

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((item,index) => 

        <div key={index}>
        
          {currentUserId === postAuthorId  ?
          <div key={index}>
           <div key={item.id} className="border p-2 rounded mb-2">
          <p><strong>{item.commentor_name}:</strong> {item.comment_section}</p>
           <button onClick={() => handleDelete(item.id,slug)} disabled={isPending} className="text-red-500 text-sm">
              {isPending ? "Deleting..." : "Delete"}
            </button>
            </div>
            </div>
        :
        <div key={index}>
        <div key={item.id} className="border p-2 rounded mb-2">
          <p><strong>{item.commentor_name}:</strong> {item.comment_section}</p>
          {item.user_id === currentUserId && 
           <button onClick={() => handleDelete(item.id,slug)} disabled={isPending} className="text-red-500 text-sm">
              {isPending ? "Deleting..." : "Delete"}
            </button>}
            </div>
            </div>
        }


            
        </div>
)}
    </div>
  )
}

export default Comments
