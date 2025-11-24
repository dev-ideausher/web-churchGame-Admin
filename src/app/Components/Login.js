"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useFirebaseAuth from "../../../auth/useFirebaseAuth";  
import { setToken } from "../../../auth/userCookies";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const { loginWithEmailAndPassword } = useFirebaseAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    const res = await loginWithEmailAndPassword(email, pass);

    if (res.status) {
      setToken(res.token, res.expiryTime);   // save cookie
      toast.success("Login Successful!");
      router.push("/dashboard");
    }
    else{
        toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="w-full flex flex-row h-full">
      <div className="w-1/2 bg-[#B9B4FD]">1</div>

      <div className="w-1/2 flex items-center justify-start px-16">
        <div className="flex flex-col items-start gap-5 w-full">
          <h1 className="text-[#090914] font-bold text-3xl">Welcome back!</h1>

          <div className="flex flex-col gap-1 w-full">
            <label>Email</label>
            <input
              type="email"
              className="bg-[#F8FAFC] rounded-xl border p-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label>Password</label>
            <input
              type="password"
              className="bg-[#F8FAFC] rounded-xl border p-2"
              placeholder="Enter your password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="bg-[#4E4C6A] text-white py-4 px-6 rounded-full w-full mt-4"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
