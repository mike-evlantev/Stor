import axios from "axios";

export const narrowError = (error: unknown): string => {
    let message: string;
    if (typeof error === "string") {
        message = error;
    } else if (error instanceof Error) {
        message = error.message;
    } else if (axios.isAxiosError(error)) {
        console.log("AxiosError", error);
        message = error.response?.data.message;
    } else {
        message = String(error);
    }

    return message;
}