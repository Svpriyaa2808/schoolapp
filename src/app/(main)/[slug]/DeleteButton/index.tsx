'use client'
import { useMutation } from "@tanstack/react-query"
import { DeletePost } from "../../../../../actions/delete-post"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const DeleteButton = ({postId}:{postId:number}) => {
    const router = useRouter()

    const {mutate,error} = useMutation({
        mutationFn:DeletePost,
        onMutate: () => toast.loading("Deleting your post..."),
        onSuccess: () => {
            toast.success("Post Deleted")
            router.push("/")
            router.refresh()
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Failed to delete post")
        }
    })

    return <button className="button-tertiary" onClick={()=>mutate(postId)}>Delete Post</button>
}

export default DeleteButton