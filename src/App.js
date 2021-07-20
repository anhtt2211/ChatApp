import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ChatRoom, Login } from "./components";
import AuthProvider from "./context/AuthProvider";
import AppProvider from "./context/AppProvider";
import AddRoomModal from "./components/Modal/AddRoomModal";
import InviteMembersModal from "./components/Modal/InviteMembersModal";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={ChatRoom} />
          </Switch>
          <AddRoomModal />
          <InviteMembersModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
