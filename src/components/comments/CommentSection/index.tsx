// 'use client'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { commentSchema } from "../../../../actions/schemas"
// import { useMutation } from "@tanstack/react-query"
// import { CreateComment } from "../../../../actions/create-comment"

// const CommentSection = () => {
//       console.log("11111111")
//     const {register,handleSubmit,formState:{errors}} = useForm({
//         resolver:zodResolver(commentSchema)
//     })

//     const {mutate,data} = useMutation({
//         mutationFn: CreateComment
//     })

//     return (
//         <form onSubmit={handleSubmit(values =>{
//             console.log("comment",values.comment_section)
//             mutate({comment_section:values.comment_section,username:values.username,slug:values.slug})
//         } )}>
//             <fieldset>
//                 <label htmlFor="comment">Comments:</label>
//                 <textarea  {...register("comment_section")} className=" w-full ml-2 mb-4  bg-gray-300 rounded-2xl p-2 " id="comment" name="comment" placeholder="Enter your thoughts" />
//             </fieldset>
//             <button className="button-secondary" type="submit" >Submit</button>
//         </form>
//     )
// }

// export default CommentSection

'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { commentSchema } from "../../../../actions/schemas"
import { useMutation } from "@tanstack/react-query"
import { CreateComment } from "../../../../actions/create-comment"

const CommentSection = ({ slug ,user_id,id}: { slug: string,user_id:string,id:number }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(commentSchema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: CreateComment,
    onSuccess: () => {
      reset()
    }
  })
 
  return (
    <form onSubmit={handleSubmit(values => {
      mutate({ comment_section: values.comment_section, slug,id})
    })}>
      <fieldset>
        <label htmlFor="comment">Comments:</label>
        <textarea
          {...register("comment_section")}
          className="w-full ml-2 mb-4 bg-gray-300 rounded-2xl p-2"
          id="comment"
          placeholder="Enter your thoughts"
          
        />
         <button  type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
        {errors.comment_section && <p className="text-red-500 text-sm">{errors.comment_section.message}</p>}
        <button >Delete comment</button>
      </fieldset> 
    </form>
  )
}

export default CommentSection
