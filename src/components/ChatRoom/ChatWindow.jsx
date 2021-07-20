import React from "react";
import styled from "styled-components";
import { Button, Avatar, Tooltip, Form, Input, Alert } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import Message from "./Message";
import { AppContext } from "../../context/AppProvider";
import { addDocument } from "../../context/services";
import { AuthContext } from "../../context/AuthProvider";
import useFireStore from "../../hooks/useFireStore";

const WrapperStyled = styled.div`
  height: 100vh;
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 57px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const ContentStyled = styled.div`
  height: calc(100% - 57px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ChatWindow = () => {
  const { selectedRoom, members, setIsInviteMembersVisible } =
    React.useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = React.useContext(AuthContext);
  const [inputValue, setInputValue] = React.useState("");
  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    form.resetFields(["messages"]);
  };

  const messagesCondition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );
  const messages = useFireStore("messages", messagesCondition);
  console.log({ messages });

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <div>
              <ButtonGroupStyled>
                <Button
                  type="text"
                  style={{ marginRight: 5 }}
                  icon={<UserAddOutlined />}
                  onClick={() => setIsInviteMembersVisible(true)}
                >
                  Add
                </Button>
                <Avatar.Group size="small" maxCount={2}>
                  {members.map((member) => (
                    <Tooltip title={member.displayName} key={member.id}>
                      <Avatar src={member.photoURL}>
                        {member.photoURL
                          ? ""
                          : member.displayName?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </ButtonGroupStyled>
            </div>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages.map((message) => (
                <Message
                  key={message.id}
                  text={message.text}
                  photoURL={message.photoURL}
                  displayName={message.displayName}
                  createAt={message.createAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="messages">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  bordered={false}
                  autoComplete="off"
                  placeholder="Typing your message..."
                />
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Send
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Please choose a room"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
  );
};

export default ChatWindow;
