import { IShippingOption } from "../types/IShippingOption";

export const availableShippingOptions: IShippingOption[] = [
    {
        id: 1,
        icon: "fas fa-truck fa-3x",
        name: "Standard Shipping",
        timeframe: "4-5 business days",
        cost: 0,
    },
    {
        id: 2,
        icon: "fas fa-shipping-fast fa-3x",
        name: "Express Shipping",
        timeframe: "2-4 business days",
        cost: 20,
    },
    {
        id: 3,
        icon: "fas fa-plane fa-3x",
        name: "Priority Shipping",
        timeframe: "2-3 business days",
        cost: 30,
    },
];