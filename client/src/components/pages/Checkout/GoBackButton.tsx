import * as React from "react";
import { Button } from "react-bootstrap";

interface Props {
    step: number
    handleClick: () => void; //() => setStep(step - 1)
}

export const GoBackButton: React.FC<Props> = ({step, handleClick}: Props) => {
    return (
        <Button variant="light" className="my-2" onClick={handleClick}>
            Go Back
        </Button>
    );
};