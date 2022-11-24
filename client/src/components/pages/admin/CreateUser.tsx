import * as React from "react";
import { createUser } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IKeyValuePair } from "../../../types/IKeyValuePair";
import { IUser } from "../../../types/IUser";
import { Loader } from "../../shared/Loader";
import { UserForm } from "./UserForm";

export const CreateUser: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.admin);
    const [user, setUser] = React.useState<IUser>({isActive: true} as IUser);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value} as IKeyValuePair<string>;
        setUser(prev => ({...prev, ...obj}));
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const obj = {[name]: checked};
        setUser(prev => ({...prev, ...obj}));
    };

    const handleSubmit = async () => {
        dispatch(createUser(user));
    }

    return (<>
        {loading 
            ? <Loader /> 
            : <UserForm user={user} onChange={handleChange} onStateChange={handleStateChange} onChecked={handleChecked} onSave={handleSubmit} />}
    </>);
}