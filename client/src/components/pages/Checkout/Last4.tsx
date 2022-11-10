import * as React from "react";

interface Props {
    brand: string | undefined;
    last4: string | undefined;
}

export const Last4: React.FC<Props> = ({brand, last4}) => {
    const getCreditCardBrandIcon = (brand: string | undefined) => {
        //`amex`, `diners`, `discover`, `jcb`, `mastercard`, `unionpay`, `visa`, or `unknown`.
        switch (brand) {
            case "amex":
                return <i className="fab fa-cc-amex fa-4x"></i>;
            case "diners":
                return <i className="fab fa-cc-diners-club fa-4x"></i>;
            case "discover":
                return <i className="fab fa-cc-discover fa-4x"></i>;
            case "jcb":
                return <i className="fab fa-cc-jcb fa-4x"></i>;
            case "mastercard":
                return <i className="fab fa-cc-mastercard fa-4x"></i>;
            case "visa":
                return <i className="fab fa-cc-visa fa-2x"></i>;
            case "unionpay":
            case "unknown":
            case undefined:
            default:
                return <i className="fas fa-credit-card fa-4x"></i>;
        }
    }

    return(
        <div className="d-flex align-items-center">
            {getCreditCardBrandIcon(brand)}
            <div className="mx-1"></div>
            <strong>ending in {last4}</strong>
        </div>
    );
}