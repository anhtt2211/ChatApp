import React from "react";

import { AuthContext } from "./AuthProvider";
import useFireStore from "../hooks/useFireStore";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = React.useState(false);
  const [isInviteMembersVisible, setIsInviteMembersVisible] =
    React.useState(false);
  const [selectedRoomId, setSelectedRoomId] = React.useState("");
  const { user } = React.useContext(AuthContext);

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user.uid]);

  const rooms = useFireStore("rooms", roomsCondition);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFireStore("users", usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        isInviteMembersVisible,
        setIsInviteMembersVisible,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
