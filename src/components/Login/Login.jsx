import React from "react";
import { Row, Col, Button, Typography } from "antd";

import firebase, { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../context/services";

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
  const hanldLogin = async (provider) => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }}>Chat app</Title>
          <Button
            style={{ width: "100%", marginBottom: "5px" }}
            onClick={() => hanldLogin(ggProvider)}
          >
            Login with google
          </Button>
          <Button
            style={{ width: "100%" }}
            onClick={() => hanldLogin(fbProvider)}
          >
            Login with facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
