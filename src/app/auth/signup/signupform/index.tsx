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
