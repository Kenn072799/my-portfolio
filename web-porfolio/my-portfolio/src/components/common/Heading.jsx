import React from "react";

const Heading = ({
  as = "h2", // h1, h2, h3...
  size, // sm, md, lg, xl
  weight,
  children,
  className = "",
}) => {
  const Tag = as;

  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const fontWeights = {
    sm: "font-semibold",
    md: "font-bold",
  };

  return (
    <Tag
      className={`
        ${fontWeights[weight]}
        text-text-primary
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
};

export default Heading;
