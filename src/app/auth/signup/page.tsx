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
