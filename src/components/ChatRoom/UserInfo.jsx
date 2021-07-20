import React from "react";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";

import { auth } from "../../firebase/config";
import { AuthContext } from "../../context/AuthProvider";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgb(230, 230, 230);

  .username {
    color: black;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button onClick={() => auth.signOut()}>Log out</Button>
    </WrapperStyled>
  );
}
