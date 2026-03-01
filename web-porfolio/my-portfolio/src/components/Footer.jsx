import React from "react";

const Footer = () => {
  return (
    <div className="py-6 text-center">
      <p className="text-sm text-text-primary font-semibold">
        &copy; {new Date().getFullYear()} Kenneth Altes. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
