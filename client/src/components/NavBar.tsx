import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../store/auth";
import closePopup from "../store/closePopup";
import Button from "./UI/Buttons/Button";
import ButtonPopup from "./UI/Buttons/ButtonPopup";

import { useFullUser } from "../lib/useMyData";
import { useEffect, useState } from "react";
import { useJobs } from "../lib/useAllJobs";

export default function NavBar() {
  const { isAuth } = useAuth();
  const logOut = useAuth((state) => state.logout);
  const togglePopup = closePopup((state) => state.togglePopup);
  const { pathname } = useLocation();
  const { data: job } = useJobs();
  const [showTask, setShowTask] = useState(false);
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

  const { data: dataUser } = useFullUser();
  useEffect(() => {
    if (dataUser?.user && dataUser.user?.CreatedTask.length > 0) {
      setShowTask(true);
    }
  }, [dataUser]);

  function handleNavigate() {
    navigate(`/project/${job?.[0].id}`);
  }

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
          {isAuth ? (
            <>
              <Button
                color="text-sm  link bg-white w-[150px]"
                onClick={() => navigate("/create")}
              >
                Create a offer
              </Button>{" "}
              <Button onClick={() => navigate("/setting")} color="bg-white">
                Setting
              </Button>
              <ButtonPopup onClick={logout} color="bg-white text-black text-sm">
                Logout
              </ButtonPopup>
            </>
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
