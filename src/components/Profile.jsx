import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserData = localStorage.getItem("app_data");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []); // Only run once on component mount

  return (
    <div className="max-w-sm mx-auto p-6 mt-8 bg-white rounded-lg shadow-md text-center">
      <img
        src={
          userData.role === "manager"
            ? "https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-600nw-542759665.jpg"
            : "https://png.pngtree.com/png-clipart/20231024/original/pngtree-illustration-of-a-female-doctor-for-profile-picture-png-image_13409385.png"
        }
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-xl font-semibold text-gray-800">
        {user.email || "No email"}
      </h2>
      <p className="text-gray-600 capitalize">
        {userData.role || "No role specified"}
      </p>
    </div>
  );
};

export default Profile;
