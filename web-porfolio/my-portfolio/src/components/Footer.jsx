import React from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiOutlineMail,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="border-t border-border-default mt-8">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center gap-4">
        {/* Name / Brand */}
        <div className="text-center">
          <p className="font-semibold text-text-primary">Kenneth Altes</p>
          <p className="text-xs text-text-muted">
            Full Stack Developer • AI Enthusiast
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-text-muted">
          <a
            href={`mailto:${import.meta.env.VITE_EMAIL}`}
            className="hover:text-text-primary transition"
          >
            <AiOutlineMail size={18} />
          </a>

          <a
            href={import.meta.env.VITE_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition"
          >
            <AiFillGithub size={18} />
          </a>

          <a
            href={import.meta.env.VITE_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition"
          >
            <AiFillLinkedin size={18} />
          </a>

          <a
            href={import.meta.env.VITE_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition"
          >
            <AiFillFacebook size={18} />
          </a>
        </div>

        {/* Tech credit */}
        <p className="text-xs text-text-muted text-center">
          Built with React, Tailwind CSS, AI and ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
