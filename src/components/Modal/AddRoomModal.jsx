import React from "react";
import { Form, Modal, Input } from "antd";

import { AppContext } from "../../context/AppProvider";
import { addDocument } from "../../context/services";
import { AuthContext } from "../../context/AuthProvider";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } =
    React.useContext(AppContext);
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    //add new room to firebase
    console.log({ formData: form.getFieldValue() });
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });
    //reset form value
    form.resetFields();

    setIsAddRoomVisible(false);
  };
  const handleCancel = () => {
    //reset form value
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Add room"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Room name" name="name">
            <Input placeholder="Typing room name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              onPressEnter={handleOk}
              placeholder="Typing description"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
