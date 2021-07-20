import React from "react";
import { Row, Col } from "antd";

import UserInfo from "./UserInfo";
import Rooms from "./Rooms";
import styled from "styled-components";

const SidebarStyled = styled.div`
  background: white;
  color: black;
  height: 100vh;

  border-right: 1px solid rgb(230, 230, 230);
`;

export default function SideBar() {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <Rooms />
        </Col>
      </Row>
    </SidebarStyled>
  );
}
