import instance from "@/configs/axios";
import { User } from "@/interfaces/User";
import userReducer from "@/reducers/userReduser";
import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

export type UserContextType = {
  state: { users: User[] };
  dispatch: React.Dispatch<any>;
  removeUser: (id: string | undefined) => void;
  handleUser: (data: User) => void;
};
export const UserContext = createContext({} as UserContextType);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, { users: [] });
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/v1/auth/users`);
      console.log(data);
      dispatch({ type: "GET_USERS", payload: data });
    })();
  }, []);

  const removeUser = async (id: string | undefined) => {
    if (confirm("Ban co chac muon xoa user nay khong?")) {
      try {
        await instance.delete(`/v1/auth/users/${id}`);
        dispatch({ type: "REMOVE_USER", payload: id });
      } catch (error: any) {
        console.log(error);
      }
    } else {
      alert("Da huy");
    }
  };

  const handleUser = async (user: User) => {
    try {
      if (user._id) {
        const { data } = await instance.put(`/v1/auth/users/${user._id}`, user);
        dispatch({ type: "UPDATE_USER", payload: data });
        alert(data.message);
        nav("/admin/users");
      } else {
        alert("Loi edit");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ state, dispatch, removeUser, handleUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
