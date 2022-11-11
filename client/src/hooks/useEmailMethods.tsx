import axios from "axios";
import { narrowError } from "../utils/errorUtils";
import { useAppDispatch } from "./useAppDispatch";
import { alert } from "../features/messages/messagesSlice";
import { IUser } from "../types/IUser";

interface useEmailMethodsResult {
    sendEmail: () => Promise<void>;
}

export const useEmailMethods = (): useEmailMethodsResult => {
    const dispatch = useAppDispatch();
    const email = process.env.REACT_APP_ADMIN_EMAIL as string;
    const password = process.env.REACT_APP_ADMIN_PASSWORD as string;    
    
    const sendEmail = async () => {
        try {
            const token = await getToken({email, password});
            const payload = { message: "triggering send email from home component" };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            };
            const result = await axios.post("/api/email/send", payload, config);
            
            console.log(result.data);
            return result.data;
        } catch (error) {
            const message = narrowError(error);
            dispatch(alert({text: message, type: "danger"}));
        }        
    };
    
    return {sendEmail};
}


// Get token
const getToken = async (userData: Pick<IUser, "email" | "password">) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
  
    const { data } = await axios.post("/api/users/login", userData, config);
    return data.token;
}