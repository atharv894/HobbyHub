import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [loading] = useState(false);

  const login = async (email, password) => {
    // No authentication check - just set a dummy user and redirect
    const dummyUser = {
      id: "1",
      name: email.split("@")[0],
      email: email,
      hobbies: [],
    };
    setUser(dummyUser);
    localStorage.setItem("user", JSON.stringify(dummyUser));
    return { success: true };
  };

  const signup = async (name, email, password) => {
    // No authentication check - just set a dummy user and redirect
    const dummyUser = {
      id: "1",
      name: name,
      email: email,
      hobbies: [],
    };
    setUser(dummyUser);
    localStorage.setItem("user", JSON.stringify(dummyUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateHobbies = async (hobbies) => {
    // Just update local state
    const updatedUser = { ...user, hobbies };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return { success: true };
  };

  const fetchUser = async () => {
    // Just return current user from localStorage
    return user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateHobbies,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
