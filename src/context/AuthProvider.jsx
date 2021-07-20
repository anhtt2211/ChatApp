import React from "react";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";

import { auth } from "../firebase/config";
import useFireStore from "../hooks/useFireStore";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    const unsubcribed = auth.onAuthStateChanged((user) => {
      console.log({ user });
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setUser({
          displayName,
          email,
          photoURL,
          uid,
        });
        setIsLoading(false);
        history.push("/");

        return;
      }

      setIsLoading(false);
      history.push("/login");
    });

    return () => {
      unsubcribed();
    };
  }, [history]);

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user]);

  const rooms = useFireStore("rooms", roomsCondition);

  return (
    <AuthContext.Provider value={{ user, rooms }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
