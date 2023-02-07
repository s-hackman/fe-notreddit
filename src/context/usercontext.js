import { createContext, useState, useEffect } from "react";
import { getUsers } from "../utils/api";
const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [loginUser, setLoginUser] = useState({
    username: "jessjelly",
    name: "Jess Jelly",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
  });
  const [err, setErr] = useState(null);

  useEffect(() => {
    getUsers()
      .then((usersRes) => {
        setUsers(usersRes);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, []);

  return (
    <UserContext.Provider value={{ users, loginUser, setLoginUser, err }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
