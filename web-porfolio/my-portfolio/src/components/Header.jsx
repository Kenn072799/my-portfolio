import React from "react";
import { AiFillGithub } from "react-icons/ai";

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
          <span className="material-symbols-outlined">
            location_on
          </span>
          Angono, Rizal • Philippines
        </p>

        <div className="flex gap-3 pt-1">
          <a
            className="text-text-secondary font-medium hover:underline"
            href="#"
          >
            <div className="shadow px-3 py-1 flex items-center gap-1">
              <AiFillGithub className="text-xl" />
              <p className="text-sm">GitHub</p>
            </div>
          </a>
          <a className="text-accent-main font-medium hover:underline" href="#">
            <div className="shadow px-3 py-1">LinkedIn</div>
          </a>
          <a className="text-accent-main font-medium hover:underline" href="#">
            <div className="shadow px-3 py-1">Facebook</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
