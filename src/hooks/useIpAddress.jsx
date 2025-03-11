import React, { useContext } from "react";

import { IpAddressContext } from "../contexts/IpAddress";

function useIpAddress() {
  const contexts = useContext(IpAddressContext);

  if (!contexts) {
    throw new Error("Make sure to use 'useIpAddress' within 'IpAddressContext'");
  }

  return contexts;
}

export { useIpAddress };
