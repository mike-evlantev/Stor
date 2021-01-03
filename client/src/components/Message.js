import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, delay, children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, delay);
  }, [delay]);
  return visible ? <Alert variant={variant}>{children}</Alert> : null;
};

Message.defaultProps = {
  variant: "info",
  delay: 5000,
};

export default Message;
