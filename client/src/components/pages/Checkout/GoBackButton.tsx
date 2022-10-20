import * as React from "react";
import { Button } from "react-bootstrap";

interface Props {
    prevStep: number;
    handleClick: (step: number) => void;
}

export const GoBackButton: React.FC<Props> = ({prevStep, handleClick}: Props) => {
    return (
        <Button variant="secondary" className="m-2" onClick={() => handleClick(prevStep)}>
            Go Back
        </Button>
    );
};