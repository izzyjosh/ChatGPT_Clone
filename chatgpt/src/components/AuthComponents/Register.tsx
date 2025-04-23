import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Chatgptbanner from "../../assets/Chatgptbanner.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase.ts";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import LoadButton from "../LoadButton";
import { FirebaseError } from "firebase/app";

type eventT = React.ChangeEvent<HTMLInputElement>;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleFirstNameChange = (e: eventT) => {
    setUser({ ...user, firstName: e.target.value });
  };
  const handleLastNameChange = (e: eventT) => {
    setUser({ ...user, lastName: e.target.value });
  };
  const handleEmailChange = (e: eventT) => {
    setUser({ ...user, email: e.target.value });
  };
  const handlePasswordChange = (e: eventT) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const activeUser = userCredential.user;
      if (activeUser) {
        await setDoc(doc(db, "Users", activeUser.uid), {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      }
      toast.success("Account created successfully");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(error.message, { position: "bottom-left" });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex">
      <div className="w-1/2 h-full hidden md:block">
        <img
          className="object-cover h-full"
          src={Chatgptbanner}
          alt="chatgpt image"
        />
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 p-4">
        <div className="w-full max-w-md mx-auto space-y-4 rounded">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Create Account
          </h2>

          {/* First and Last Name */}
          <form>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium mb-1"
                >
                  First name
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={user.firstName}
                  onChange={handleFirstNameChange}
                  placeholder="Enter your first name"
                  className="w-full border border-gray px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-mint"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium mb-1"
                >
                  Last name
                </label>
                <input
                  id="lastname"
                  type="text"
                  value={user.lastName}
                  onChange={handleLastNameChange}
                  placeholder="Enter your last name"
                  className="w-full border border-gray px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-mint"
                />
              </div>
            </div>

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
                  value={user.password}
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

            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input id="terms" type="checkbox" className="h-4 w-4 rounded" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray">
                I agree with{"  "}
                <a href="#" className="text-yellow underline">
                  Terms
                </a>
                {"  "}
                and{"  "}
                <a href="#" className="text-yellow underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}

            <LoadButton
              name={"create account"}
              loading={loading}
              handleClick={() => handleSignup
}
            />
          </form>

          {/* OR divider */}
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <hr className="w-1/4" />
            <span className="text-sm">OR</span>
            <hr className="w-1/4" />
          </div>

          {/* Google Sign Up */}
          <button className="w-full flex items-center justify-center gap-2 border-gray border-2 py-2 px-4 rounded-md shadow-sm hover:bg-black">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="text-sm font-medium text-black hover:text-white">
              Sign up with Google
            </span>
          </button>

          {/* Login Redirect */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
