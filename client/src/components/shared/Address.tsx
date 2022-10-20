import * as React from "react";
import { IName } from "../../types/IName";
import { IAddress } from "../../types/IAddress";

interface Props {
    name?: IName;
    address: IAddress;
}

export const Address: React.FC<Props & React.HTMLAttributes<any>> = ({name, address, ...props}) => {
    const {address1, address2, city, state, zip} = address;
    return(
        <div {...props}>
            {name && <div>{name.first}&nbsp;{name.last}</div>}
            <div>{address1}{", "}{address2}</div>
            <div>{city}{", "}{state}&nbsp;{zip}</div>
        </div>
    );
}