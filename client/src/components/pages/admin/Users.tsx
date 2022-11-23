import * as React from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { getUsers } from "../../../features/admin/adminSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Loader } from "../../shared/Loader";

export const Users: React.FC = () => {
	const history = useHistory();
	const dispatch = useAppDispatch();
	const { loading, users } = useAppSelector(state => state.admin);
	const { loggedInUser } = useAppSelector(state => state.auth);

	React.useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return <>
		{loading
                ? <Loader />
                : <>
					<Button className="float-end my-3" onClick={() => history.push("users/create")}>Add User</Button>
					<Table className="table-sm">
						<thead>
							<tr>
								<th>User ID</th>
								<th>Email</th>
								<th>First</th>
								<th>Last</th>
								<th>Active</th>
								<th>Admin</th>
							</tr>
						</thead>
						<tbody>
							{users?.length > 0 && users.map(u => 
								<tr key={u.id} className="align-middle">
									<td>
										<Link to={`users/${u.id}`}>
											{u.id}
										</Link>
									</td>
									<td>{u.email}</td>
									<td>{u.first}</td>
									<td>{u.last}</td>
									<td>
										<Form.Check 
											type="switch"
											id="user-active"
											checked={u.isActive}
										/>
									</td>
									<td>
										<Form.Check 
											type="switch"
											id="user-admin"
											checked={u.isAdmin}
											disabled={!loggedInUser?.isAdmin}
										/>
									</td>
								</tr>)}
						</tbody>
					</Table>
				</>}
	</>;
};