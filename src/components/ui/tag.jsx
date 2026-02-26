import React from "react";

const Tag = ({ label = null, className = "", ...props }) => {
  return (
    <div
      className={`text-sm text-primary bg-txtPrimary px-2 py-1 rounded ${className}`}
      {...props}
    >
      {label}
    </div>
  );
};

export default Tag;
