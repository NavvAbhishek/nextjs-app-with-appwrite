"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log("Signup success", response.data)
      router.push("/login")
    } catch (error:any) {
      console.error("Signup Failed",error.message)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing":"Signup" }</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="p-2 rounded"
        value={user.username}
        onChange={(e) => setUser({
          ...user,
          username: e.target.value,
        })}
        placeholder="username"
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        className="p-2 rounded"
        value={user.email}
        onChange={(e) => setUser({
          ...user,
          email: e.target.value,
        })}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        className="p-2 rounded"
        value={user.password}
        onChange={(e) => setUser({
          ...user,
          password: e.target.value,
        })}
        placeholder="password"
      />
      <button onClick={onSignup}>
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
};

export default SignUpPage;
