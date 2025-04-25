import React, { useState } from "react";
import Chatgptbanner from "../../assets/Chatgptbanner.jpg";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, provider } from "../../firebase.ts";
import { toast } from "react-toastify";
import LoadButton from "../LoadButton";
import { FirebaseError } from "firebase/app";

type eventT = React.ChangeEvent<HTMLInputElement>;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Record<string, string>>({
    email: "",
    password: ""
  });

  const handleEmailChange = (e: eventT) => {
    setUser({ ...user, email: e.target.value });
  };
  const handlePasswordChange = (e: eventT) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const activeUser = userCredential.user;
      if (activeUser) {
        toast.success("Login successfully");
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message, { position: "bottom-left" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        if (token && user) {
          toast.success("Login successfully");
          navigate("/");
        }
      })
      .catch(error => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(`${error.message}, ${credential}`, {
          position: "bottom-left"
        });
      });
  };
  return (
    <>
      <div className="h-screen flex">
        <div className="w-1/2 h-full hidden md:block">
          <img
            className="object-cover h-full"
            src={Chatgptbanner}
            alt="chatgpt image"
          />
        </div>
        <div className="flex items-center justify-center w-full md:w-1/2 p-4">
          <div className=" w-full max-w-md mx-auto space-y-4 rounded">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Login
            </h2>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="w-full border border-gray px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-mint"
              />
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={user.passwore}
                  onChange={handlePasswordChange}
                  placeholder="Create password"
                  className="w-full border border-gray px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-mint"
                />
                <span className="absolute right-3 top-2.5 text-gray-400 cursor-pointer">
                  {/* Add icon here if needed */}
                  &#128065;
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="terms" type="checkbox" className="h-4 w-4 rounded" />
                <label htmlFor="terms" className="ml-2 text-sm text-gray">
                  Keep me logged in
                </label>
              </div>
              <div>Forgot password?</div>
            </div>
            {/* Submit Button */}{" "}
            <LoadButton
              name={"Login"}
              loading={loading}
              handleClick={handleLogin}
            />
            {/* OR divider */}
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <hr className="w-1/4" />
              <span className="text-sm">OR</span>
              <hr className="w-1/4" />
            </div>
            {/* Google Sign Up */}
            <button
              className="w-full flex items-center justify-center gap-2 border-gray border-2 py-2 px-4 rounded-md shadow-sm hover:bg-gray"
              onClick={handleLoginWithGoogle}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              <span className="text-sm font-medium text-gray-700">
                Login with Google
              </span>
            </button>
            {/* Login Redirect */}
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-yellow font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
