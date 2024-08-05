import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { User } from "@/interfaces/User";
import { useNavigate } from "react-router-dom";
import instance from "@/configs/axios";
import userReducer from "@/reducers/userReduser";

export interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  handleUser: (data: User) => void;
  dispatch: React.Dispatch<any>;
  isAdmin: boolean;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, { users: [] });
  const [user, setUser] = useState<User | null>(null);
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      setUser(user);
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    nav(user.role === "admin" ? "/admin" : "/");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);

    nav("/signin");
  };
  const handleUser = async (user: User) => {
    console.log(user);
    try {
      const { data } = await instance.put(`/v1/auth/users/${user._id}`, user);
      console.log(data);
      dispatch({ type: "UPDATE_USER", payload: data });
      alert(data.message);
      nav("/admin/users");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        handleUser,
        dispatch,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
