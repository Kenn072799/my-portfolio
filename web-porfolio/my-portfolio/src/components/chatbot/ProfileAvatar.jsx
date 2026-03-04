import React from "react";

const ProfileAvatar = () => {
  return (
    <div className="relative w-9 h-9 rounded-full overflow-hidden">
      {/* Moving Gradient */}
      <div className="absolute inset-0 animate-gradient bg-size-[200%_200%] bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600" />
    </div>
  );
};

export default ProfileAvatar;
