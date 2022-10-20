import * as React from "react";

interface DevProps {
    children: React.ReactNode;
}

export const Dev: React.FC<DevProps> = ({children}) => {
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }
    //style={{backgroundColor: "gray", opacity: "0.5"}}
    
    return (
        <div className="dev d-flex flex-column p-2" >
           <strong>DEV</strong>
           {children}
        </div>
    );
}