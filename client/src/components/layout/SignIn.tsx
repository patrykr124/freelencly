import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import { useSignUp } from "../../lib/useSignIn";
import useAuth from "../../store/auth";
import closePopup from "../../store/closePopup";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../../lib/useGoogleLogin";

interface pops {
  showSigninEmail: boolean;
  setShowSigninEmail: (prev: boolean) => void;
}

export default function SignIn({ showSigninEmail, setShowSigninEmail }: pops) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const singInMutation = useSignUp();
  const loginAuth = useAuth((state) => state.login);
  const { togglePopup } = closePopup();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const googleLogin = useGoogleLogin();
  const isAuth = useAuth((state) => state.isAuth);
  function handleShowSigninEmail(e: React.MouseEvent) {
    e.stopPropagation();
    setShowSigninEmail(!showSigninEmail);
  }

  function handleSingIn(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!email) {
        setEmailError("Email is required");
      } else if (!email.includes("@")) {
        setEmailError("Invalid email");
      }
      if (!password) {
        setPasswordError("Password is required");
      } else if (password.length < 6) {
        setPasswordError("Password must have more than 6 word!");
      }
      if (!name) {
        setUsernameError("Username neccessary");
      }
      singInMutation.mutate(
        { email, password, name },
        {
          onSuccess: (data: {
            id: string;
            email: string;
            name: string;
            token: string;
          }) => {
            loginAuth(
              { id: data.id, email: data.email, name: data.name },
              data.token
            );
            console.log("Rejestracja się udała!", data);
            localStorage.setItem("token", data.token);
            togglePopup(false);
          },
          onError: (error: { message: string }) => {
            console.log(error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {showSigninEmail ? (
        <div className="flex flex-col justify-center w-full  gap-8">
          <div
            onClick={handleShowSigninEmail}
            className="flex absolute top-8 left-4 gap-2 items-center"
          >
            <BiArrowBack size={20} />
            <p className="">Back</p>
          </div>

          <div className="">
            <form className="" onSubmit={handleSingIn}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                placeholder="E-mail"
                className="mt-1.5 border-[1px]   w-full p-1.5 rounded-lg "
              />
              {emailError && (
                <p className="text-red-500 m-0 -mt-2 mb-2">{emailError}</p>
              )}

              <label htmlFor="name">Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="name"
                placeholder="Name"
                className="mt-1.5 border-[1px] w-full p-1.5 rounded-lg "
              />
              {usernameError && (
                <p className="text-red-500 m-0 -mt-2 mb-2">{usernameError}</p>
              )}

              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                placeholder="Password"
                className="mt-1.5 border-[1px] w-full p-1.5 rounded-lg "
              />
              {passwordError && (
                <p className="text-red-500 m-0 -mt-2 mb-2">{passwordError}</p>
              )}

              <button type="submit" className="submit">
                Login
              </button>
              {singInMutation.isError && (
                <p className="text-red-500">{singInMutation.error.message}</p>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full  gap-8">
          <div className="space-y-2">
            <div className="border-[1px] hover:bg-black/10 cursor-pointer flex items-center  justify-center gap-4 px-4 rounded-lg border-black/30 py-2 w-full">
              {isAuth ? (
                <p>Zalogowany</p>
              ) : (
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                      googleLogin.mutate(credentialResponse.credential, {
                        onSuccess: (data: {
                          id: string;
                          email: string;
                          name: string;
                          token: string;
                        }) => {
                          loginAuth(
                            { id: data.id, email: data.email, name: data.name },
                            data.token
                          );
                          console.log("Rejestracja się udała!", data);
                          localStorage.setItem("token", data.token);
                          togglePopup(false);
                        },
                        onError: (error: { message: string }) => {
                          console.log(error);
                        },
                      });
                    }
                  }}
                  onError={() => {
                    alert("Google login failed");
                  }}
                />
              )}
              {googleLogin.isError && (
                <p className="text-red-500 mt-2">
                  {googleLogin.error?.message}
                </p>
              )}
            </div>
            <button
              onClick={handleShowSigninEmail}
              className="border-[1px] hover:bg-black/10 cursor-pointer flex items-center  justify-center gap-4 px-4 rounded-lg border-black/30 py-2 w-full"
            >
              <FaEnvelope /> Sing in with E-mail{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
