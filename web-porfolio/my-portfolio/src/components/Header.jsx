import React from "react";
import {
  AiFillGithub,
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineMail,
} from "react-icons/ai";
import ProfilePicture from "../assets/FormalAttire1x1.png";
import ProfilePictureDark from "../assets/FormalAttire1x1_dark.png";
import { vibrate } from "../utils/vibrate";
import { useDarkMode } from "../hooks/useDarkMode";

const socialLinks = [
  {
    name: "GitHub",
    href: import.meta.env.VITE_GITHUB_URL,
    icon: AiFillGithub,
    className: "text-text-secondary",
  },
  {
    name: "LinkedIn",
    href: import.meta.env.VITE_LINKEDIN_URL,
    icon: AiFillLinkedin,
    className: "text-accent-main",
  },
  {
    name: "Facebook",
    href: import.meta.env.VITE_FACEBOOK_URL,
    icon: AiFillFacebook,
    className: "text-accent-main",
  },
];

const Header = () => {
  const { isDark, toggle } = useDarkMode();

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 py-4">
      {/* Dark mode toggle – mobile top */}
      <div className="flex justify-end w-full sm:hidden">
        <button
          onClick={() => {
            toggle();
            vibrate(8);
          }}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="p-2 border border-border-default bg-bg-card hover:bg-bg-muted
                     transition flex items-center justify-center cursor-pointer rounded"
        >
          <span
            className="material-symbols-outlined text-text-primary"
            style={{ fontSize: 20 }}
          >
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </div>
      {/* Avatar */}
      <img
        src={isDark ? ProfilePictureDark : ProfilePicture}
        alt="Profile picture"
        className="w-32 h-32 rounded-full object-cover border border-border-default"
      />

      {/* Content */}
      <div className="flex flex-col gap-1 text-center sm:text-left w-full">
        <div className="flex items-center justify-center sm:justify-between">
          <p className="text-2xl font-bold text-text-primary">Kenneth Altes</p>
          {/* Dark mode toggle – desktop only */}
          <button
            onClick={() => {
              toggle();
              vibrate(8);
            }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="hidden sm:flex p-2 border border-border-default bg-bg-card hover:bg-bg-muted
                       transition items-center justify-center cursor-pointer rounded"
          >
            <span
              className="material-symbols-outlined text-text-primary"
              style={{ fontSize: 20 }}
            >
              {isDark ? "light_mode" : "dark_mode"}
            </span>
          </button>
        </div>

        <p className="text-sm text-text-muted font-medium">
          Associate Software Engineer
        </p>

        <p className="flex items-center justify-center sm:justify-start gap-1 text-text-muted text-sm">
          <span className="material-symbols-outlined text-base">
            location_on
          </span>
          Angono, Rizal • Philippines
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-3 w-full sm:w-auto">
          {/* Email – primary */}
          <a
            href={`mailto:${import.meta.env.VITE_EMAIL}`}
            onClick={() => vibrate(8)}
            className="w-full sm:w-auto font-medium shadow px-4 py-2
                   bg-text-primary text-bg-main
                   flex items-center justify-center gap-1 rounded
                   hover:opacity-90 transition"
          >
            <AiOutlineMail />
            <span className="text-sm">Send Email</span>
          </a>

          {/* Social links */}
          <div className="flex gap-2 w-full sm:w-auto">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => vibrate(8)}
                  className={`${item.className}
                          flex-1 sm:flex-none
                          px-2 sm:px-3 py-2
                          border border-border-default
                          flex items-center justify-center sm:justify-start
                          gap-1 rounded
                          hover:bg-bg-muted transition`}
                >
                  <Icon className="text-lg shrink-0" />
                  <span className="text-xs sm:text-sm whitespace-nowrap">
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
