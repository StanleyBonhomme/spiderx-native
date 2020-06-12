// write here
import React, { useState, createContext } from "react";

export const AuthContext = createContext("")

export const AuthProvider = ({ children }) => {
	const [userToken, setUserToken] = useState("")

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
