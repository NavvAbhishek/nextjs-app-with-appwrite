"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const Profile = () => {
  const router = useRouter()
  const [userData, setUserData] = useState("")
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push('/')
    } catch (error: any) {
      console.error("Logout failed", error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    setUserData(res.data.data._id)
    console.log(res.data)
    //! We can also use useEffect for this
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-white">{userData === "" ? "Nothing" : <Link href={`/profile/${userData}`}>{userData}</Link>}</h2>
        Profile
        <button onClick={getUserDetails}>Get User Details</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
