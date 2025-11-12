// import Link from "next/link"
// import SignUpForm from "./signupform"

// const SignUp = () => {
//      return(
//         <div className="border-1 rounded-xl  p-4  w-[500px] mx-auto ">
//         <h4> Sign Up?</h4>
//         <SignUpForm/>
//         <div>
//                 Already have an account ? <Link className="text-red-500" href="/auth/login">Login </Link>
//         </div>
//         </div>
//     )
// }


// export default SignUp

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