import { useEffect, useRef, useState } from "react";
import closePopup from "../store/closePopup";
import Login from "./layout/Login";
import SignIn from "./layout/SignIn";


export default function Popup() {
  const closeRef = useRef<HTMLDivElement>(null);
  const { isPopup, togglePopup } = closePopup();
  const [showSigninEmail, setShowSigninEmail] = useState(false);
  const [loginPage, setLoginPage] = useState(false);

  function handleLoginPage(e: React.MouseEvent) {
    e.stopPropagation();
    setLoginPage(!loginPage);
  }

  useEffect(() => {
    function click(e: MouseEvent) {
      const target = e.target;
      if (target && (target as HTMLElement).id === "open-popup") return;
      if (closeRef.current && !closeRef.current.contains(e.target as Node)) {
        togglePopup(false);
        setShowSigninEmail(false);
      }
    }
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("click", click);
    };
  }, [togglePopup]);

  

  return (
    <div
      className={`${
        isPopup ? "flex" : "hidden"
      } fixed z-[999] top-[50%] left-[50%] translate-[-50%]  w-screen h-screen bg-black/80 items-center justify-center`}
    >
      <div
        ref={closeRef}
        className="bg-white overflow-hidden rounded-lg w-[900px] h-[70%]  flex shadow-md"
      >
        <div className="w-1/2 flex items-center justify-center ">
          <img
            className="object-cover w-full h-full object-center"
            alt="popup"
            src="/img/popup.jpg"
          />
        </div>
        <div className="flex flex-col relative items-center justify-center w-1/2 space-y-8 p-12">
          {loginPage ? (
            <div className="flex items-center flex-col gap-2">
              <h4 className="text-3xl font-semibold">Sign in</h4>
              <p className="flex gap-1">
                Don't have an account?
                <button onClick={handleLoginPage} className="flex underline">
                  Sing up
                </button>
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <h4 className="text-3xl font-semibold">Create a new account</h4>
              <p className="flex gap-1">
                Already have an account?
                <button onClick={handleLoginPage} className="flex underline">
                  Sign in
                </button>
              </p>
            </div>
          )}
          {loginPage ? (
            <Login />
          ) : (
            <SignIn
              showSigninEmail={showSigninEmail}
              setShowSigninEmail={setShowSigninEmail}
            />
          )}
        </div>
      </div>
    </div>
  );
}
