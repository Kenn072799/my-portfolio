import React from "react";
import { AiFillGithub, AiFillFacebook, AiFillLinkedin } from "react-icons/ai";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: AiFillGithub,
    className: "text-text-secondary",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: AiFillLinkedin,
    className: "text-accent-main",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/yourusername",
    icon: AiFillFacebook,
    className: "text-accent-main",
  },
];

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
          <span className="material-symbols-outlined">location_on</span>
          Angono, Rizal • Philippines
        </p>

        <div className="flex gap-2 pt-1">
          {socialLinks.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${item.className} font-medium`}
              >
                <div className="shadow px-3 py-1 flex items-center gap-1 hover:bg-black/5 transition hover:translate-y-0.5 duration-150 hover:shadow-none">
                  <Icon className="text-xl" />
                  <p className="text-sm">{item.name}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
