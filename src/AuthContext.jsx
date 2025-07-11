import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE"); 
  const [error, setError] = useState(null);

  // TODO: signup
  const signup = async () => {
    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  }),
      });
      const result = await response.json();
      setToken(result.token);
      setLocation("TABLET");
    } catch (err) {
    setError(err.message)
  }
  }

  // TODO: authenticate
   const authenticate = async (token) => {
    try {
      const response = await fetch(`${API}/authenticate`, {
        headers: { Authorization: `Bearer ${token}` },
      });

  const value = { location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
