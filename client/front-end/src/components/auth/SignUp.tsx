import React, { useState } from "react";
import Input from "../common/Input";
import { useRouter } from "next/router";
import { useSignUpWithEmailMutation } from "@/controller/api";
import Link from "next/link";

export default function SignInPage() {
  const [active, setActive] = useState(false);
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState("email");
  const router = useRouter();

  const [signUpWithEmail] = useSignUpWithEmailMutation();
  const toggle = () => {
    setActive(!active);
    setTab(tab === "email" ? "wallet" : "email");
  };
  console.log(tab, active);
  const activeStyle = active ? " bg-blue-500 text-white" : "text-gray-500";

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUpFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });

  const handleSignupFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      // const response = await signUpWithEmail({
      //   email: signUpForm.email,
      //   username: signUpForm.username,
      //   password: signUpForm.password,
      // }).unwrap();
      console.log(signUpForm)
     // console.log("fulfilled", response);
      router.push("/dashboard");
    } catch (error) {
      console.log("rejected", error);
    }
  };

  const onEnter = () => {
    if (entered) return;
    setEntered(true);
  };
  return (
    <div className="flex flex-col w-full max-w-[500px] mx-auto rounded-[25px] bg-white p-8 mb-20 border form-bg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-[#0B51FF]">Join Yarapay.</h1>
        <p className="p-2 px-6 font-bold  text-sm text-[#0B51FF] bg-[#F3F5FB] rounded-lg cursor-pointer">
          LOGIN
        </p>
      </div>
      <div className="flex justify-between p-2 rounded items-center bg-[#F5F8FE] w-full my-2 lg:my-4">
        <p
          onClick={toggle}
          className={`text-center text-sm font-bold w-full p-3 rounded uppercase cursor-pointer
          ${tab === "email" ? "bg-[#0B51FF] text-white" : "text-gray-500"}
          `}
        >
          Sign up with mail
        </p>
        <p
          onClick={toggle}
          className={`text-center text-sm font-bold w-full p-3 rounded uppercase cursor-pointer
          ${tab === "wallet" ? "bg-[#0B51FF] text-white" : "text-gray-500"}
          `}
        >
          Sign up with Wallet
        </p>
      </div>
      {
        // If tab is email, show this
        tab === "email" ? (
          <form
            className="w-full flex flex-col gap-2"
            onSubmit={handleSignupFormSubmit}
          >
            <div onMouseEnter={onEnter} className="w-full">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={signUpForm.email}
                onChange={handleSignUpFormChange}
              />
            </div>

            {entered && (
              <>
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={signUpForm.username}
                  onChange={handleSignUpFormChange}
                />

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={signUpForm.password}
                  onChange={handleSignUpFormChange}
                />
              </>
            )}
            <p className="text-center text-xs my-2 text-gray-500 max-w-[300px] mx-auto">
              By signing up, you agree to the{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Terms and conditions
              </span>{" "}
              and{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Privacy Policy.
              </span>
            </p>

            {/* Sign up button */}
            <button className="btn-blue py-3 px-8 w-full">Sign up</button>
            {/* Login redirect */}
            <p className="text-center text-[#8e8f94] font-light pt-2">
              Already have an account?{" "}
              <Link href={""} className="text-yara-blue font-medium">Login</Link>
            </p>
            <div className="my-8 relative">
              <hr />
              <p className="absolute top-1/2 left-1/2 rounded-full -my-6 p-4 text-xs bg-white">
                OR
              </p>
            </div>
            <SocialLogin />
          </form>
        ) : (
          // If tab is wallet, show this
          <form className="w-full my-4" action="">
            <Input
              label="Wallet Address"
              type="text"
              placeholder="Enter your wallet address"
            />
          </form>
        )
      }
    </div>
  );
}
const SocialLogin = () => {
  return (
    <div className="flex flex-col gap-4">
      <button className="bg-[#F5F8FE] border border-[#E1E8F0] w-full rounded flex items-center px-4 justify-between p-3">
        <p className="flex gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.4414 12.2652C23.4414 11.2819 23.3616 10.5644 23.1889 9.82031H11.9609V14.2583H18.5515C18.4187 15.3612 17.7012 17.0221 16.1066 18.1382L16.0843 18.2868L19.6343 21.037L19.8803 21.0616C22.1391 18.9754 23.4414 15.906 23.4414 12.2652Z"
              fill="#4285F4"
            />
            <path
              d="M11.9606 23.9588C15.1894 23.9588 17.9 22.8958 19.8799 21.0622L16.1062 18.1388C15.0964 18.8431 13.741 19.3347 11.9606 19.3347C8.79814 19.3347 6.11408 17.2486 5.15728 14.3652L5.01704 14.3771L1.32562 17.234L1.27734 17.3682C3.24388 21.2747 7.2833 23.9588 11.9606 23.9588Z"
              fill="#34A853"
            />
            <path
              d="M5.15551 14.3658C4.90305 13.6217 4.75695 12.8244 4.75695 12.0006C4.75695 11.1767 4.90305 10.3795 5.14223 9.63541L5.13554 9.47694L1.39786 6.57422L1.27557 6.63239C0.465069 8.25349 0 10.0739 0 12.0006C0 13.9273 0.465069 15.7476 1.27557 17.3687L5.15551 14.3658Z"
              fill="#FBBC05"
            />
            <path
              d="M11.9605 4.66505C14.2061 4.66505 15.7209 5.63503 16.5846 6.44563L19.9596 3.1503C17.8868 1.22361 15.1894 0.0410156 11.9605 0.0410156C7.2833 0.0410156 3.24388 2.72508 1.27734 6.63158L5.144 9.6346C6.11408 6.75121 8.79814 4.66505 11.9605 4.66505Z"
              fill="#EB4335"
            />
          </svg>
          Sign up with Google
        </p>
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.357587 15.0426C-0.0524638 14.6325 -0.0524638 13.9677 0.357587 13.5576L5.91512 8.0001L0.357587 2.44256C-0.0524638 2.03251 -0.0524638 1.36769 0.357587 0.957637C0.767637 0.547585 1.43246 0.547585 1.84251 0.957637L8.14251 7.25764C8.55256 7.66769 8.55256 8.33251 8.14251 8.74256L1.84251 15.0426C1.43246 15.4526 0.767637 15.4526 0.357587 15.0426Z"
            fill="black"
          />
        </svg>
      </button>
      <button className="bg-[#F5F8FE] border border-[#E1E8F0] w-full rounded flex items-center px-4 justify-between p-3">
        <p className="flex gap-2">
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1513 4.01314C13.5924 3.50474 13.9288 2.9142 14.141 2.27545C14.3533 1.6367 14.4373 0.962314 14.3882 0.291016C13.0339 0.400331 11.7768 1.03726 10.8877 2.06457C10.462 2.55693 10.1393 3.12972 9.93889 3.74903C9.73846 4.36833 9.66434 5.02155 9.72091 5.67001C10.3815 5.67551 11.0345 5.52894 11.6293 5.24163C12.2242 4.95431 12.745 4.53397 13.1513 4.01314V4.01314ZM16.0917 12.6942C16.0995 11.8001 16.335 10.9228 16.776 10.145C17.217 9.36715 17.8488 8.71452 18.612 8.24866C18.1304 7.55469 17.4937 6.98248 16.7524 6.57741C16.0111 6.17234 15.1857 5.94556 14.3415 5.91504C12.5213 5.72835 10.8411 6.97684 9.8726 6.97684C8.90415 6.97684 7.53898 5.93838 6.02213 5.96171C5.03049 5.99438 4.06424 6.2835 3.21764 6.80087C2.37103 7.31824 1.67297 8.0462 1.19153 8.91374C-0.862054 12.4842 0.666467 17.7932 2.72005 20.6752C3.6535 22.087 4.82031 23.6856 6.3605 23.6272C7.90069 23.5689 8.40242 22.6704 10.1876 22.6704C11.9729 22.6704 12.5213 23.6272 14.0381 23.5922C15.555 23.5572 16.6284 22.1454 17.6086 20.7335C18.3029 19.7085 18.8452 18.5884 19.2188 17.4081C18.294 17.0138 17.5051 16.3572 16.9494 15.5194C16.3936 14.6817 16.0955 13.6995 16.0917 12.6942V12.6942Z"
              fill="black"
            />
          </svg>
          Sign up with Apple
        </p>
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.357587 15.0426C-0.0524638 14.6325 -0.0524638 13.9677 0.357587 13.5576L5.91512 8.0001L0.357587 2.44256C-0.0524638 2.03251 -0.0524638 1.36769 0.357587 0.957637C0.767637 0.547585 1.43246 0.547585 1.84251 0.957637L8.14251 7.25764C8.55256 7.66769 8.55256 8.33251 8.14251 8.74256L1.84251 15.0426C1.43246 15.4526 0.767637 15.4526 0.357587 15.0426Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
};
