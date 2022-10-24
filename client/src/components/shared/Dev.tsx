import * as React from "react";

interface DevProps {
    children: React.ReactNode;
}

export const Dev: React.FC<DevProps & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    const {className} = props;

    if (process.env.NODE_ENV !== 'development') {
        return null;
    }
    
    return (
        <div className={`dev ${className}`}>
           <strong>DEV</strong>
           {children}
        </div>
    );
}