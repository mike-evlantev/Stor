import * as React from "react";
import { useHistory } from "react-router-dom";
import { getUsers } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Loader } from "../../shared/Loader";

export const Users: React.FC = () => {
	const history = useHistory();
	const dispatch = useAppDispatch();
	const { loading, users } = useAppSelector(state => state.admin);

	React.useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return <>
		{loading
                ? <Loader />
                : <div>
					{users?.map(u => <p>
						{u.id}
					</p>)}
				</div>}
	</>;
};