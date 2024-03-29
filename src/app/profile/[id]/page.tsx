import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
     <h1> UserProfile</h1>
     <p className="text-5xl font-bold">Profile Page <span className="text-yellow-600">{params.id}</span></p>
    </div>
  );
};

export default UserProfile;
