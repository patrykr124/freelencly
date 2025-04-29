import { useState } from "react";
import Header from "../components/UI/Header";
import { useCurrentUser } from "../lib/useCurrentUser";
import { useUpdateUser } from "../lib/useUpdateUser";
import useAuth from "../store/auth";

export default function Setting() {
    const [name, setName] = useState<string>("")
    const { token } = useAuth();
    const updateUser = useUpdateUser(token ?? "")
    const { data: currentUser } = useCurrentUser(token ?? "")

    function handleSubmit() {
        updateUser.mutate(name)

    }
    return (
        <div className="flex flex-col items-center justify-center" >
            <Header title="Settings" img="/img/webdev.jpg" />
            <div className="max-w-md py-20">
                <div className="pb-10 flex flex-col items-center justify-center gap-4">
                    <h2>Your data</h2>
                    <div className="flex flex-col items-center gap-2">
                        <img className="rounded-full bg-black/20 w-16 h-16" />
                        <p className="text-xl text-center">{currentUser?.user?.name}</p>
                    </div>
                </div>

                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label className="mb-0" htmlFor="name">Change name</label>
                    <input className="" placeholder={currentUser?.user?.name} value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" />
                    <button type="submit" className="bg-black w-full text-white px-12 py-3 rounded-xl cursor-pointer">Change</button>
                </form>
            </div>
        </div>
    )
}