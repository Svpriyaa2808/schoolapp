// 'use client'
// import { LogIn } from "../../../../../actions/log-in"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { logInSchema } from "../../../../../actions/schemas"
// import ErrorMessage from "@/components/ErrorMessage"
// import { useMutation } from "@tanstack/react-query"

// const LogInForm = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors }} = useForm({
//         resolver: zodResolver(logInSchema)
//     })

//     const {mutate,isPending,data} = useMutation({
//         mutationFn: LogIn
//     })

//     return(
//         <>
//         <form className="flex flex-col m-4" onSubmit={handleSubmit(values => mutate(values))}>
         
//             <fieldset className="m-4">
//                 <label htmlFor="email">Enter your email</label>
//                 <input id="email" className="ml-2 bg-gray-300 rounded-2xl p-2 mb-4" {...register("email")} placeholder="enter your email id"/>
//                 {errors.email && <ErrorMessage message={errors.email.message!} />}
//             </fieldset>

//               <fieldset className="m-4">
//                 <label htmlFor="password">Enter your password</label>
//                 <input id="password" type="password" {...register("password")} className="ml-2 mb-4  bg-gray-300 rounded-2xl p-2 " placeholder="enter your password id"/>
//                 {errors.password && <ErrorMessage message={errors.password.message!} />}
//             </fieldset>

//             <button className="button-secondary w-1/2 m-auto">{isPending ? "Logging you in" : "Log In!"}</button>
//         </form>
//         {data && data.error && <ErrorMessage message={data.error} />}
//         </>
//     )
// }

// export default LogInForm

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