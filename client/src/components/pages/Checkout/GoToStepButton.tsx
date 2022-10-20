import * as React from "react";
import { Button } from "react-bootstrap";

interface Props {
    label: string;
    nextStep: number;
    handleClick: (step: number) => void;
}

export const GoToStepButton: React.FC<Props> = ({ label, nextStep, handleClick }: Props) => {
    return (
        <div className="d-flex flex-column ml-auto mx-2">
            <Button variant="primary" className="my-2" onClick={() => handleClick(nextStep)}>
                {label}
            </Button>
            <span className="text-muted">Proceed to step {nextStep} of 3</span>
        </div>
    );
};