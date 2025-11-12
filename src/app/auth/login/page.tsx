// import Link from "next/link"
// import LogInForm from "./LoginForm"

// const LogIn = () => {
//     return(
//         <div className="border-1 rounded-xl  p-4  w-[700px] mx-auto ">
//         <h4 className="font-bold text-3xl mb-4"> Log In?</h4>
//         <LogInForm />
//         <div>
//                 Dont have an account ?SignUp <Link className="text-red-500" href="/auth/signup">SignUp</Link>
//         </div>
//         </div>
//     )
// }

// export default LogIn

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