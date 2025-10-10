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
        <form className="flex flex-col m-4" onSubmit={handleSubmit(values => mutate(values))}>
         
            <fieldset className="m-4">
                <label htmlFor="email">Enter your email</label>
                <input id="email" className="ml-2 bg-gray-300 rounded-2xl p-2 mb-4" {...register("email")} placeholder="enter your email id"/>
                {errors.email && <ErrorMessage message={errors.email.message!} />}
            </fieldset>

              <fieldset className="m-4">
                <label htmlFor="password">Enter your password</label>
                <input id="password" type="password" {...register("password")} className="ml-2 mb-4  bg-gray-300 rounded-2xl p-2 " placeholder="enter your password id"/>
                {errors.password && <ErrorMessage message={errors.password.message!} />}
            </fieldset>

            <button className="button-secondary w-1/2 m-auto">{isPending ? "Logging you in" : "Log In!"}</button>
        </form>
        {data && data.error && <ErrorMessage message={data.error} />}
        </>
    )
}

export default LogInForm