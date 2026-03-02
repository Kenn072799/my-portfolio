import React from "react";
import {
  AiFillGithub,
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineMail,
} from "react-icons/ai";

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
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 py-4">
      {/* Avatar */}
      <img
        src="https://placehold.co/120x120"
        alt="Profile picture"
        className="w-28 h-28 rounded-full object-cover border border-border-default"
      />

      {/* Content */}
      <div className="flex flex-col gap-1 text-center sm:text-left w-full">
        <p className="text-2xl font-bold text-text-primary">Kenneth Altes</p>

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
            href="mailto:kennethaltes27@gmail.com"
            className="w-full sm:w-auto font-medium shadow px-4 py-2
                   bg-text-primary text-white
                   flex items-center justify-center gap-1 rounded
                   hover:bg-black/90 transition"
          >
            <AiOutlineMail />
            <span className="text-sm">Send Email</span>
          </a>

          {/* Social links (FIXED) */}
          <div className="flex gap-2 w-full sm:w-auto">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${item.className}
                          flex-1 sm:flex-none
                          px-2 sm:px-3 py-2
                          border border-border-default
                          flex items-center justify-center sm:justify-start
                          gap-1 rounded
                          hover:bg-black/5 transition`}
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
