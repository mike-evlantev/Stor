import * as React from "react";
import { useLocation } from "react-router-dom";

interface Props {
    status: number;
    statusText: number;
    message: string;
    stack: string;
}

export const ErrorPage: React.FC = () => {
    const location = useLocation<Props>();
    const {status, statusText, message} = location.state;
    return (<>
        <h2>{status} {statusText}</h2>
        <p>{message}</p>
        {/* <pre><code>{stack}</code></pre> */}
    </>);
}