import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// @ts-ignore
export const AuthContext = createContext();

function AuthContextProvider(props: any) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [loading, setLoading] = useState(false);

  async function getLoggedIn() {
    // const loggedInRes = await axios.get("http://localhost:5000/auth/loggedIn");
    const loggedInRes = await axios.get(
      "http://172.20.10.2:3002/api/user/loggedIn"
    );
    console.log("loggedInres" , loggedInRes?.data)
    await setLoggedIn(loggedInRes.data);
    await setLoading(true);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
}


export { AuthContextProvider };
