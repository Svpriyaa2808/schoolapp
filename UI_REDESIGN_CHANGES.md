# UI Redesign - Complete Code Changes

This document contains all the code changes for the modern UI redesign with animations.

---

## 1. Global Styles (src/app/globals.css)

**REPLACE THE ENTIRE FILE WITH:**

```css
@import "tailwindcss";

* {
  box-sizing: border-box;
}

html {
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

.animate-slideInLeft {
  animation: slideInFromLeft 0.5s ease-out;
}

@layer components {
  .button-primary {
    @apply bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-8 font-bold rounded-2xl text-4xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:to-purple-700;
  }

  .button-secondary {
    @apply bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 font-bold rounded-xl text-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-indigo-700;
  }

  .button-tertiary {
    @apply bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2 px-6 font-bold rounded-xl text-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-gray-800 hover:to-black;
  }

  .card {
    @apply bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-white/20;
  }

  .input-field {
    @apply w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none;
  }

  .glass-card {
    @apply bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl;
  }
}
```

---

## 2. Home Posts Component (src/components/Home/HomePosts/index.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
'use client'
import { createClient } from "@/utils/supabase/browser-client";
import { getHomePosts, HomePostType } from "@/utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const HomePosts = ({posts}:{posts:HomePostType}) => {

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-white text-center mb-8 animate-fadeInUp">
                Latest Posts
            </h1>
            <div className="flex flex-col gap-6">
                {posts && posts.map(({id,title,slug,users}, index)=>
                    <Link
                        href={`/${slug}`}
                        className="card p-6 group animate-fadeInUp hover:bg-white"
                        key={id}
                        style={{animationDelay: `${index * 0.1}s`}}
                    >
                        <h2 className="font-bold text-2xl text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                            {title}
                        </h2>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {users.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Written by</p>
                                    <p className="font-semibold text-gray-800">{users.username}</p>
                                </div>
                            </div>
                            <div className="text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
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
```

---

## 3. Header Component (src/components/Header/index.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
import Logo from "../Logo"
import AccountLinks from "../AccountLinks"
import SearchInput from "../Search"

const Header = () => {
    return (
        <>
        <header className="glass-card px-8 py-4 mb-8 animate-fadeIn">
            <div className="flex justify-between items-center flex-wrap gap-4 max-w-7xl mx-auto">
                <Logo />
                <SearchInput />
                <AccountLinks />
            </div>
        </header>
        </>
    )
}

export default Header
```

---

## 4. Post Detail Page (src/app/(main)/[slug]/page.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
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
        <div className="max-w-4xl mx-auto px-4 py-8">
           {data &&
           <>
            {/* Post Header */}
            <div className="card p-8 mb-6 animate-fadeInUp">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{data.title}</h1>
                <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {data.users?.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Written by</p>
                        <p className="font-semibold text-gray-900">{data.users?.username}</p>
                    </div>
                </div>
            </div>

            {/* Post Image */}
            {data?.image &&
                <div className="card p-6 mb-6 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-auto rounded-xl shadow-lg"
                    />
                </div>
            }

            {/* Post Content */}
            <div className="card p-8 mb-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                {data.content &&
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {data.content}
                    </div>
                }
            </div>

            {/* Author Actions */}
            {isAuthor &&
                <div className="card p-6 mb-6 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                    <p className="text-sm text-gray-600 mb-4 font-semibold">Manage Your Post</p>
                    <div className="flex gap-3 flex-wrap">
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
```

---

## 5. Comments Component (src/components/comments/index.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
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

  const handleDelete = (id: number,slug:string) => {
      deleteComment(id, slug)
  }

  const {mutate,isPending,error} = useMutation({
        mutationFn:DeletePost,
    })

  return (
    <div className="card p-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="text-purple-600">💬</span>
        Comments ({comments.length})
      </h3>
      <div className="space-y-4">
        {comments.map((item,index) =>
          <div
            key={item.id}
            className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.commentor_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">{item.commentor_name}</p>
                  <p className="text-gray-700 leading-relaxed">{item.comment_section}</p>
                </div>
              </div>

              {/* Show delete button if user is post author OR comment author */}
              {(currentUserId === postAuthorId || item.user_id === currentUserId) && (
                <button
                  onClick={() => handleDelete(item.id,slug)}
                  disabled={isPending}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  )
}

export default Comments
```

---

## 6. Comment Section Form (src/components/comments/CommentSection/index.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { commentSchema } from "../../../../actions/schemas"
import { useMutation } from "@tanstack/react-query"
import { CreateComment } from "../../../../actions/create-comment"
import { toast } from "sonner"

const CommentSection = ({ slug ,user_id,id}: { slug: string,user_id:string,id:number }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(commentSchema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: CreateComment,
    onSuccess: () => {
      reset()
      toast.success("Comment added successfully!")
    },
    onError: () => {
      toast.error("Failed to add comment")
    }
  })

  return (
    <div className="card p-6 mb-6 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Add a Comment</h3>
      <form onSubmit={handleSubmit(values => {
        mutate({ comment_section: values.comment_section, slug, id})
      })} className="space-y-4">
        <div>
          <textarea
            {...register("comment_section")}
            className="input-field min-h-[120px] resize-y"
            placeholder="Share your thoughts..."
            disabled={isPending}
          />
          {errors.comment_section && (
            <p className="text-red-500 text-sm mt-2 font-medium">
              {errors.comment_section.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="button-secondary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  )
}

export default CommentSection
```

---

## 7. Login Page (src/app/auth/login/page.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
import Link from "next/link"
import LogInForm from "./LoginForm"

const LogIn = () => {
    return(
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card p-8 w-full max-w-md animate-fadeInUp">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                    <p className="text-gray-600">Sign in to continue to your account</p>
                </div>

                <LogInForm />

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300"
                            href="/auth/signup"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LogIn
```

---

## 8. Login Form (src/app/auth/login/LoginForm/index.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
'use client'
import { LogIn } from "../../../../../actions/log-in"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchema } from "../../../../../actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"

const LogInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }} = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate,isPending,data} = useMutation({
        mutationFn: LogIn
    })

    return(
        <>
        <form className="space-y-5" onSubmit={handleSubmit(values => mutate(values))}>

            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    className="input-field"
                    {...register("email")}
                    placeholder="Enter your email"
                    disabled={isPending}
                />
                {errors.email && <ErrorMessage message={errors.email.message!} />}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="input-field"
                    placeholder="Enter your password"
                    disabled={isPending}
                />
                {errors.password && <ErrorMessage message={errors.password.message!} />}
            </div>

            <button
                type="submit"
                className="button-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
            >
                {isPending ? "Logging you in..." : "Log In"}
            </button>
        </form>
        {data && data.error && (
            <div className="mt-4">
                <ErrorMessage message={data.error} />
            </div>
        )}
        </>
    )
}

export default LogInForm
```

---

## 9. Signup Page (src/app/auth/signup/page.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
import Link from "next/link"
import SignUpForm from "./signupform"

const SignUp = () => {
     return(
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card p-8 w-full max-w-md animate-fadeInUp">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join us today and start sharing!</p>
                </div>

                <SignUpForm/>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link
                            className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300"
                            href="/auth/login"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}


export default SignUp
```

---

## 10. Signup Form (src/app/auth/signup/signupform/index.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
'use client'
import { useForm } from "react-hook-form"
import { signUpSchema } from "../../../../../actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { SignUp } from "../../../../../actions/sign-up"
import ErrorMessage from "@/components/ErrorMessage"

const SignUpForm = () => {
    const {register,
        handleSubmit,
        formState: {errors}} = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const {mutate,isPending,error} = useMutation({
        mutationFn:SignUp
    })

    return(
        <>
        <form onSubmit={handleSubmit(values => mutate(values))} className="space-y-5">

            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    className="input-field"
                    {...register("email")}
                    placeholder="Enter your email"
                    disabled={isPending}
                />
                {errors.email && <ErrorMessage message={errors.email.message!} />}
            </div>

            <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                </label>
                <input
                    id="username"
                    {...register("username")}
                    className="input-field"
                    placeholder="Choose a username"
                    disabled={isPending}
                />
                {errors.username && <ErrorMessage message={errors.username.message!} />}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="input-field"
                    placeholder="Create a password"
                    disabled={isPending}
                />
                {errors.password && <ErrorMessage message={errors.password.message!} />}
            </div>

            <button
                type="submit"
                className="button-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
            >
                {isPending ? "Creating Account..." : "Sign Up"}
            </button>
        </form>

        </>
    )
}

export default SignUpForm
```

---

## 11. Create Post Page (src/app/(main)/create/page.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { postSchema } from "../../../../actions/schemas"
import { useMutation } from "@tanstack/react-query"
import { CreatePost } from "../../../../actions/create-post"
import ErrorMessage from "@/components/ErrorMessage"
import z from "zod"

const CreatePage = () => {

    const schemaWithImage = postSchema.omit({image:true}).
                                        extend({image:z.unknown().transform(value =>
                                        {return value as(FileList)}).optional()})

    const {register,handleSubmit,formState : {errors}} = useForm ({
        resolver:zodResolver(schemaWithImage)
    })

    const {mutate,isPending,error} = useMutation({
        mutationFn:CreatePost
    })

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="card p-8 animate-fadeInUp">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Post</h1>
                    <p className="text-gray-600">Share your thoughts with the community</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(values =>{
                                                        let imageForm = new FormData();
                                                        if(values.image?.length) {
                                                            imageForm.append('image',values.image[0])
                                                        }
                                                        mutate({title:values.title,content:values.content,image:imageForm})
                                                        })}>

                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                            Post Title
                        </label>
                        <input
                            id="title"
                            className="input-field"
                            {...register("title")}
                            placeholder="What's your post called?"
                            disabled={isPending}
                        />
                        {errors.title && <ErrorMessage message={errors.title.message!} />}
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            {...register("content")}
                            className="input-field min-h-[200px] resize-y"
                            placeholder="Share your story..."
                            disabled={isPending}
                        />
                        {errors.content && <ErrorMessage message={errors.content.message!} />}
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                            Upload an Image (Optional)
                        </label>
                        <input
                            type="file"
                            id="image"
                            {...register("image")}
                            className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            accept="image/*"
                            disabled={isPending}
                        />
                        {errors.image && <ErrorMessage message={errors.image.message!} />}
                    </div>

                    <button
                        type="submit"
                        className="button-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isPending}
                    >
                        {isPending ? "Creating Post..." : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePage
```

---

## 12. Edit Post Form (src/app/(main)/[slug]/edit/EditForm/index.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
'use client'
import { Tables } from "@/utils/supabase/database.types"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { EditPost } from "../../../../../../actions/edit-post"
import { postSchema } from "../../../../../../actions/schemas"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMessage from "@/components/ErrorMessage"

const EditForm = ({postId,initialValues}:{postId:number,initialValues:Pick<Tables<'posts'>,"title"|"content"|"image">}) => {

    const schemaWithImage = postSchema.omit({image:true}).
                                            extend({image:z.unknown().transform(value =>
                                            {return value as(FileList)}).optional()})

    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver:zodResolver(schemaWithImage),
        defaultValues:{
            title:initialValues.title,
            content:initialValues.content || undefined,
            image:initialValues.image
        }
    })

    const {mutate,isPending,error} = useMutation({
        mutationFn: EditPost
    })

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="card p-8 animate-fadeInUp">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Post</h1>
                    <p className="text-gray-600">Update your post details</p>
                </div>

                <form onSubmit={handleSubmit(values => {
                                            let imageForm = undefined;
                                                    if(values.image?.length && typeof values.image !== 'string') {
                                                            imageForm= new FormData()
                                                            imageForm.append('image',values.image[0])
                                                        }
                                            mutate({postId, userdata:{title:values.title,content:values.content,image:imageForm}})})} className="space-y-6">

                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                            Post Title
                        </label>
                        <input
                            id="title"
                            {...register("title")}
                            className="input-field"
                            placeholder="What's your post called?"
                            disabled={isPending}
                        />
                        {errors.title && <ErrorMessage message={errors.title.message!} />}
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            {...register("content")}
                            className="input-field min-h-[200px] resize-y"
                            placeholder="Share your story..."
                            disabled={isPending}
                        />
                        {errors.content && <ErrorMessage message={errors.content.message!} />}
                    </div>

                    <div>
                        {initialValues.image && (
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Current Image</p>
                                <img
                                    className="w-full h-auto rounded-xl shadow-md"
                                    src={initialValues.image}
                                    alt="Current post image"
                                />
                            </div>
                        )}
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                            {initialValues.image ? "Upload New Image (Optional)" : "Upload an Image (Optional)"}
                        </label>
                        <input
                            type="file"
                            id="image"
                            {...register("image")}
                            className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            accept="image/*"
                            disabled={isPending}
                        />
                        {errors.image && <ErrorMessage message={errors.image.message!} />}
                    </div>

                    <button
                        type="submit"
                        className="button-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isPending}
                    >
                        {isPending ? "Updating Post..." : "Update Post"}
                    </button>

                    {error && (
                        <div className="mt-4">
                            <ErrorMessage message={error.message} />
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default EditForm
```

---

## Summary of Changes

### Key Features Added:
1. ✨ **Beautiful gradient background** (purple to indigo)
2. 🎨 **Custom CSS animations** (fadeInUp, fadeIn, slideInFromLeft)
3. 💳 **Card-based modern layout** with glass morphism effects
4. 🎯 **Hover animations** on all interactive elements
5. 👤 **User avatars** with gradient backgrounds
6. 🔘 **Modern button styles** with gradients and scale effects
7. 📝 **Improved form inputs** with focus states
8. 💬 **Beautiful comments section** with modern design
9. 📱 **Fully responsive** for mobile and desktop
10. ⚡ **Loading states** on all buttons

### Colors Used:
- Primary: Purple (#667eea to #764ba2)
- Accent: Pink (#ec4899 to #8b5cf6)
- Secondary: Blue (#3b82f6 to #4f46e5)
- Text: Gray shades

### Animation Timings:
- Staggered entrance animations (0.1s delay per item)
- Smooth transitions (300ms)
- Hover effects with scale transformations

Simply copy and paste each file's code from this document into your project!
