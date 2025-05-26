import { useRef, useState } from "react";
import Header from "../components/UI/Header";
import { useCurrentUser } from "../lib/useCurrentUser";
import { useUpdateUser } from "../lib/useUpdateUser";
import useAuth from "../store/auth";
import { useUploadAvatar } from "../lib/uploadAvatar";
import { PenBox } from "lucide-react";

export default function Setting() {
  const [name, setName] = useState<string>("");
  const { token } = useAuth();
  const updateUser = useUpdateUser(token ?? "");
  const { data: currentUser } = useCurrentUser(token ?? "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const uploadAvatar = useUploadAvatar(token ?? "");
  const fileInputClick = useRef<HTMLInputElement>(null);
  const avatarPreview = avatar ? URL.createObjectURL(avatar) : "";

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  }

  function handleImageClick() {
    fileInputClick.current?.click();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (avatar) {
      uploadAvatar.mutate({ avatarFile: avatar, name });
    } else {
      uploadAvatar.mutate({ name } as { avatarFile: File; name: string });
    }
    updateUser.mutate(name);
  }

  const rawAvatar = currentUser?.user?.avatarUrl?.replace(/\\/g, "/") || "";
  const avatarUrl = `${import.meta.env.VITE_API_URL}${
    rawAvatar.startsWith("/") ? "" : "/"
  }${rawAvatar}`;
 
  return (
    <div className="flex flex-col items-center justify-center">
      <Header title="Settings" img="/img/webdev.jpg" />
      <div className="max-w-md py-20">
        <div className="pb-10 flex flex-col items-center justify-center gap-4">
          <h2>Your data</h2>
        </div>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-2">
            <div className="relative group ">
              <div
                onClick={handleImageClick}
                className="absolute group-hover:opacity-100 opacity-0 transition-all duration-300  top-0 right-0 flex items-center justify-center w-full h-full rounded-full bg-black/40 z-0 cursor-pointer"
              >
                <PenBox className="text-white w-5 h-5" />
              </div>
              <img
                className="rounded-full object-cover bg-black/20 w-20 h-20 cursor-pointer"
                src={
                  avatarPreview
                    ? avatarPreview
                    : avatarUrl
                    ? avatarUrl
                    : import.meta.env.VITE_DEFAULT_AVATAR
                }
              />
            </div>
            <p className="text-xl text-center">{currentUser?.user?.name}</p>
            <input
              ref={fileInputClick}
              className="hidden"
              onChange={handleAvatar}
              type="file"
              id="avatar"
            />
            {uploadAvatar.isError && <div>Error uploading avatar!</div>}
          </div>

          <label className="mb-0" htmlFor="name">
            Change name
          </label>
          
            <input
            className=""
            placeholder={currentUser?.user?.name ? currentUser?.user?.name : "Write a name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
          /> 
          <button
            type="submit"
            className="bg-black w-full text-white px-12 py-3 rounded-xl cursor-pointer"
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
}
