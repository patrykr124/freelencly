import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../store/auth";
import closePopup from "../store/closePopup";
import Button from "./UI/Buttons/Button";
import ButtonPopup from "./UI/Buttons/ButtonPopup";

import { useFullUser } from "../lib/useMyData";
import { useEffect, useRef, useState } from "react";
import { useJobs } from "../lib/useAllJobs";
import { LogOut, Settings } from "lucide-react";

export default function NavBar() {
  const { isAuth } = useAuth();
  const logOut = useAuth((state) => state.logout);
  const togglePopup = closePopup((state) => state.togglePopup);
  const { pathname } = useLocation();
  const { data: job } = useJobs();
  const [showTask, setShowTask] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const closeRefAvatar = useRef<HTMLDivElement>(null);
  const { data: dataUser } = useFullUser();
  let css = "";

  if (pathname.includes("/project")) {
    css = " p-2 ";
  } else {
    css = "wrapper";
  }

  const navigate = useNavigate();

  function logout() {
    logOut();
    togglePopup(false);
    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    if (dataUser?.user && dataUser.user?.CreatedTask.length > 0) {
      setShowTask(true);
    }
  }, [dataUser]);

  function handleNavigate() {
    navigate(`/project/${job?.[0].id}`);
  }

  function handleMore() {
    setShowMore(!showMore);
  }

  useEffect(() => {
    function click(e: MouseEvent) {
      const target = e.target;
      if (target && (target as HTMLElement).id === "open-popup") return;
      if (
        closeRefAvatar.current &&
        !closeRefAvatar.current.contains(e.target as Node)
      ) {
        setShowMore(false);
      }
    }
    window.addEventListener("click", click);

    return () => {
      window.removeEventListener("click", click);
    };
  }, []);
  const rawAvatar = dataUser?.user?.avatarUrl || ""
  const normalizedAvatarUrl = rawAvatar.replace(/\\/g, "/")
  const fullAvatarUrl = `${import.meta.env.VITE_API_URL}${normalizedAvatarUrl.startsWith("/") ? "" : "/"}${normalizedAvatarUrl}`;
  
  return (
    <header
      className={` bg-black  transition-all duration-150 fixed z-[99999] top-0 w-full h-16 py-0 flex items-center justify-center`}
    >
      <div className={`${css} w-full flex justify-between`}>
        <div className="flex items-center justify-center">
          <a
            href="/"
            className="text-4xl text-white transition-colors duration-300 "
          >
            Freelencly
          </a>
        </div>
        <div className=" flex gap-4">
          {!isAuth && (
            <ButtonPopup
              color="text-sm link bg-white w-[150px]"
              onClick={() => togglePopup(true)}
            >
              Create a offer
            </ButtonPopup>
          )}

          {showTask && (
            <Button onClick={handleNavigate} color="bg-white">
              Task managment
            </Button>
          )}
          {isAuth && (
            <Button
              color="text-sm  link bg-white w-[150px]"
              onClick={() => navigate("/create")}
            >
              Create a offer
            </Button>
          )}
          {isAuth ? (
            <div ref={closeRefAvatar} className="relative ">
              <img
                src={
                  dataUser?.user?.avatarUrl
                    ? fullAvatarUrl
                    : import.meta.env.VITE_DEFAULT_AVATAR
                }
                alt="avatar"
                onClick={handleMore}
                className={`object-cover rounded-full hover:scale-95 transition-all duration-400 avatarbox cursor-pointer w-12 h-12 bg-white`}
              ></img>
              <div
                className={`${
                  showMore
                    ? " translate-y-2 opacity-100 z-50"
                    : " translate-y-8 opacity-0 -z-50"
                } transition-all duration-400 absolute rounded p-4 gap-4 bg-white flex w-[150px] flex-col left-1/2 -translate-x-1/2`}
              >
                <div
                  onClick={() => navigate("/setting")}
                  color="bg-white"
                  className="flex items-center gap-2 cursor-pointer hover:text-green-600"
                >
                  <Settings size={20} />
                  Setting
                </div>
                <div
                  id="open-popup"
                  onClick={logout}
                  color="bg-white text-black text-sm"
                  className="flex items-center gap-2 hover:text-green-600 cursor-pointer"
                >
                  <LogOut size={20} />
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <ButtonPopup
              onClick={() => togglePopup(true)}
              color="bg-black text-white text-sm"
            >
              Join
            </ButtonPopup>
          )}
        </div>
      </div>
    </header>
  );
}
