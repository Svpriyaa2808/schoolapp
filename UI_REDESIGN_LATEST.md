# UI Redesign - Latest Code Changes (Updated)

This document contains all the LATEST code changes for the modern UI redesign with:
- ✨ **Light, beautiful gradient background** (sky blue to lavender to pink)
- 🎨 **Teal/Cyan buttons** (instead of dark gray/black)
- 💧 **Water drop animations** on login/signup pages
- 📱 **Full responsive design** for mobile, tablet, and desktop
- 🌊 **Floating animations** for visual appeal

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
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
}

body {
  background: linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%);
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

/* Water Drop Animation */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

/* Ripple effect for water drops */
.ripple {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(139, 92, 246, 0.4);
  animation: ripple 2s ease-out infinite;
}

@layer components {
  .button-primary {
    @apply bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 sm:py-4 sm:px-8 font-bold rounded-2xl text-2xl sm:text-4xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:to-purple-700;
  }

  .button-secondary {
    @apply bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 sm:py-2 sm:px-6 font-bold rounded-xl text-lg sm:text-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-indigo-700;
  }

  .button-tertiary {
    @apply bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-2 px-4 sm:py-2 sm:px-6 font-bold rounded-xl text-lg sm:text-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-teal-600 hover:to-cyan-700;
  }

  .card {
    @apply bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-purple-100;
  }

  .input-field {
    @apply w-full px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none text-sm sm:text-base;
  }

  .glass-card {
    @apply bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl;
  }
}
```

---

## 2. Login Page with Water Drop Animations (src/app/auth/login/page.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
import Link from "next/link"
import LogInForm from "./LoginForm"

const LogIn = () => {
    return(
        <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Animated water drops/circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-300/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-indigo-300/20 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute bottom-20 right-10 w-36 h-36 bg-purple-300/20 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>

                {/* Spinning elements */}
                <div className="absolute top-1/4 left-1/2 w-20 h-20 border-4 border-purple-300/30 rounded-full animate-spin-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border-4 border-blue-300/30 rounded-full animate-spin-slow" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="card p-6 sm:p-8 w-full max-w-md animate-fadeInUp relative z-10">
                <div className="text-center mb-6 sm:mb-8">
                    <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                    <p className="text-sm sm:text-base text-gray-600">Sign in to continue to your account</p>
                </div>

                <LogInForm />

                <div className="mt-6 text-center">
                    <p className="text-sm sm:text-base text-gray-600">
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

## 3. Signup Page with Water Drop Animations (src/app/auth/signup/page.tsx)

**REPLACE THE ENTIRE FILE WITH:**

```tsx
import Link from "next/link"
import SignUpForm from "./signupform"

const SignUp = () => {
     return(
        <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Animated water drops/circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-teal-300/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-300/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-300/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-purple-300/20 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute bottom-20 right-10 w-36 h-36 bg-pink-300/20 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>

                {/* Spinning elements */}
                <div className="absolute top-1/4 left-1/2 w-20 h-20 border-4 border-teal-300/30 rounded-full animate-spin-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border-4 border-cyan-300/30 rounded-full animate-spin-slow" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="card p-6 sm:p-8 w-full max-w-md animate-fadeInUp relative z-10">
                <div className="text-center mb-6 sm:mb-8">
                    <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-sm sm:text-base text-gray-600">Join us today and start sharing!</p>
                </div>

                <SignUpForm/>

                <div className="mt-6 text-center">
                    <p className="text-sm sm:text-base text-gray-600">
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

## 4. Home Posts (Responsive) - src/components/Home/HomePosts/index.tsx

**REPLACE THE ENTIRE FILE WITH:**

```tsx
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
```

---

## 5. Header (Responsive) - src/components/Header/index.tsx

**REPLACE THE ENTIRE FILE WITH:**

```tsx
import Logo from "../Logo"
import AccountLinks from "../AccountLinks"
import SearchInput from "../Search"

const Header = () => {
    return (
        <>
        <header className="glass-card px-4 sm:px-6 md:px-8 py-3 sm:py-4 mb-6 sm:mb-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 max-w-7xl mx-auto">
                <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                    <Logo />
                </div>
                <div className="w-full sm:w-auto flex justify-center sm:justify-center flex-1 max-w-md">
                    <SearchInput />
                </div>
                <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                    <AccountLinks />
                </div>
            </div>
        </header>
        </>
    )
}

export default Header
```

---

## 6. Post Detail Page (Responsive) - src/app/(main)/[slug]/page.tsx

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
```

---

## Summary of All Changes

### 🎨 Design Updates:
1. **Light Background**: Sky blue → Lavender → Pink gradient (much lighter and more modern)
2. **Teal/Cyan Buttons**: Changed dark gray/black buttons to beautiful teal/cyan gradient
3. **Water Drop Animations**: Floating circles with staggered delays on auth pages
4. **Spinning Elements**: Rotating circles for visual interest
5. **Icon Animations**: Lock icon (login) and user icon (signup) with pulse effect

### 📱 Responsive Design:
- All text sizes adjust for mobile (sm:), tablet (md:), and desktop
- Header stacks vertically on mobile
- Cards have smaller padding on mobile
- Buttons resize appropriately
- All spacing uses responsive breakpoints

### ✨ Visual Enhancements:
- Emoji in "Latest Posts" heading
- Better text contrast with dark gray on light background
- Smooth hover transitions on all interactive elements
- Enhanced shadows and border colors
- Glass morphism effects with better transparency

Simply copy each file's code and paste it into your project!
