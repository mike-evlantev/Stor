import * as React from "react";
import { Button } from "react-bootstrap";

interface Props {
    nextStep: number;
    //disabled: boolean;
    handleClick: (step: number) => void;
}

export const GoToStepButton: React.FC<Props> = ({ nextStep, handleClick }: Props) => {
    return (
        <div className="my-2 float-right">
            <Button variant="primary" className="my-2 float-right" onClick={() => handleClick(nextStep)}>
                Go to next step
            </Button>
            <p className="text-muted">{`Proceed to step ${nextStep} of 3`}</p>
        </div>
    );
};