import * as React from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateCurrentUser, updateUser } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Loader } from "../../shared/Loader";
import { ConfirmationModal } from "./ConfirmationModal";
import { UserForm } from "./UserForm";

interface Params {
    id: string;
}

export const EditUser: React.FC = () => {
    const { id } = useParams<Params>();
    const dispatch = useAppDispatch();
    const { loading, user } = useAppSelector(state => state.admin);

    const [showModal, setShowModal] = React.useState(false);
    const handleShow = () => setShowModal(true);
    const handleHide = () => setShowModal(false);

    React.useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        const obj = {[name]: value};
        dispatch(updateCurrentUser(obj));
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const obj = {[name]: checked};
        dispatch(updateCurrentUser(obj));
    };

    const handleSubmit = async () => {
        handleHide();
        dispatch(updateUser(user));
    }

    return <>
        {loading 
            ? <Loader /> 
            : <UserForm user={user} onChange={handleChange} onStateChange={handleStateChange} onChecked={handleChecked} onSave={handleShow} />}
        {showModal && <ConfirmationModal onConfirm={handleSubmit} onHide={handleHide} />}
    </>;
}