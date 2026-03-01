import React from "react";

const Header = () => {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border-default">
      <img
        src="https://placehold.co/120x120"
        alt="Profile picture"
        className="w-28 h-28"
      />

      <div className="flex flex-col gap-1">
        <p className="text-2xl font-bold text-text-primary">Kenneth Altes</p>

        <p className="text-sm text-text-secondary font-medium">
          Associate Software Engineer
        </p>

        <p className="flex items-center gap-1 text-text-muted text-sm">
          <span className="material-symbols-outlined leading-none">
            location_on
          </span>
          Angono, Rizal • Philippines
        </p>

        <div className="flex gap-3 pt-1 text-sm">
          <a className="text-accent-main hover:underline" href="#">
            GitHub
          </a>
          <a className="text-accent-main hover:underline" href="#">
            LinkedIn
          </a>
          <a className="text-accent-main hover:underline" href="#">
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
