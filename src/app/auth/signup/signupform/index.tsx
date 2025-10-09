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

    const {mutate,error} = useMutation({
        mutationFn:SignUp
    })

    return(
        <>
        <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col m-auto">
         
            <fieldset className="m-2">
                <label htmlFor="email">Enter your email</label>
                <input id="email" className="ml-2 bg-gray-300 rounded-2xl p-2 " {...register("email")} placeholder="enter your email id"/>
                {errors.email && <ErrorMessage message={errors.email.message!} />}
            </fieldset>

            <fieldset className="m-2">
                <label htmlFor="username">Enter your name</label>
                <input id="username" {...register("username")} className="ml-2 bg-gray-300 rounded-2xl p-2 " placeholder="enter your user name"/>
                {errors.username && <ErrorMessage message={errors.username.message!} />}
            </fieldset>

              <fieldset>
                <label htmlFor="password">Enter your password</label>
                <input id="password" type="password" {...register("password")} className="ml-2  bg-gray-300 rounded-2xl p-2 " placeholder="enter your password id"/>
                {errors.password && <ErrorMessage message={errors.password.message!} />}
            </fieldset>

            <button className="button-secondary w-2/4">Sign Up !</button>
        </form>
        
        </>
    )
}

export default SignUpForm