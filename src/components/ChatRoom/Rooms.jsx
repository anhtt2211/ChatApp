import React from "react";
import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";

import { AppContext } from "../../context/AppProvider";

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header p {
      color: black;
    }

    .ant-collapse-content-box {
      0 40px;
    }

    .add-room {
      color: black;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: black;
`;

export default function Rooms() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="List rooms" key="1">
        {rooms.map((room) => (
          <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
            {room.name}
          </LinkStyled>
        ))}
        <Button type="primary" onClick={handleAddRoom}>
          Add room
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
