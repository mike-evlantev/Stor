import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Message = () => {
  const messages = useSelector((state) => state.messages);
  return (
    messages !== null &&
    messages.length > 0 &&
    messages.map((message) => (
      <Alert variant={message.type}>{message.text}</Alert>
    ))
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
