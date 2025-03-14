import React from "react";

import "./container.css";

function Container({ className, children }) {
  return <div className={className}>{children}</div>;
}

export default Container;
