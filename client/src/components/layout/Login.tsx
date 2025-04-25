import closePopup from "../../store/closePopup"
import { useSignIn } from "../../lib/useSignIn"
import { useState } from "react"
import useAuth from "../../store/auth"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginMutation = useSignIn()
    const {togglePopup} = closePopup()
    const loginAuth = useAuth((state) => state.login)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    function handleSingIn(e: React.MouseEvent<HTMLFormElement>) {
        e.preventDefault()

        setEmailError('')
        setPasswordError('')
        if(!email){
            setEmailError("Email is required")
        } else if(!email.includes("@")){
            setEmailError("Invalid email")
        }
        if(!password){
            setPasswordError("Password is required")
        } 

        loginMutation.mutate({ email, password },{
            onSuccess: (data: { id: string, email: string, token: string }) => {
                loginAuth({id: data.id, email: data.email}, data.token)
                togglePopup(false)
            },
            onError: (error: { message: string }) => {
                console.log("error w Login.tsx", error)
            }
        })
    
    }
  return (
    <div className="w-full">
        <form onSubmit={handleSingIn}>
            <label htmlFor="email">Email</label>
            <input  type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            {emailError && <p className="text-red-500">{emailError}</p>}

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            {passwordError && <p className="text-red-500">{passwordError}</p>}
            <button className="submit" type="submit">Login</button>
            {loginMutation.isError && <p className="text-red-500">{loginMutation.error.message}</p>}
        </form>
    </div>
  )
}