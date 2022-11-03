import * as React from "react";
import { Alert } from "react-bootstrap";
import { useAppSelector } from "../../hooks/useAppSelector";

export const Message: React.FC = () => {
    const { messages } = useAppSelector(state => state.messages);
    return (<>
        {messages?.length > 0 && messages.map(message => (
            <Alert key={message.id} variant={message.type}>{message.text}</Alert>
        ))}
    </>);
  };