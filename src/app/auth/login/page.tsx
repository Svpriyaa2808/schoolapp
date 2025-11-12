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
