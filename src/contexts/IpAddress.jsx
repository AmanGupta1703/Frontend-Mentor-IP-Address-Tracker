import React, { createContext, useReducer } from "react";

export const IpAddressContext = createContext();

const initialState = {
  ipAddressInputValue: "",
  data: {
    ipAddress: "",
    location: "",
    timezone: "",
    isp: "",
    lat: "",
    lng: "",
  },
  loading: true,
};

function ipAddressReducer(state, action) {
  switch (action.type) {
    case "IPADDRESS/SET_INPUT_VALUE":
      return { ...state, ipAddressInputValue: action.payload };
    case "IPADDRESS/SET_DATA":
      return { ...state, data: { ...action.payload } };
    default:
      return state;
  }
}

function IpAddressProvider({ children }) {
  const [{ ipAddressInputValue, data }, dispatch] = useReducer(ipAddressReducer, initialState);

  return (
    <IpAddressContext.Provider value={{ ipAddressInputValue, data, dispatch }}>
      {children}
    </IpAddressContext.Provider>
  );
}

export default IpAddressProvider;
