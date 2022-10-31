import * as React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

interface Props {
    prevStep: number;
}

export const GoBackButton: React.FC<Props> = ({prevStep}: Props) => {
    const history = useHistory();
    const handleClick = () => history.push(`checkout${prevStep}`);
    return (
        <Button variant="secondary" className="m-2" onClick={handleClick}>
            Go Back
        </Button>
    );
};