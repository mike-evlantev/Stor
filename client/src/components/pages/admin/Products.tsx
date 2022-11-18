import * as React from "react";
import { Button, Image, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { getProducts } from "../../../features/products/productsSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Loader } from "../../shared/Loader";

export const Products: React.FC = () => {
	const history = useHistory();
	const dispatch = useAppDispatch();
	const { loading, products } = useAppSelector(state => state.products);

	React.useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<>
            {loading
                ? <Loader />
                : <>
					<Button className="float-end my-3" onClick={() => history.push("products/create")}>Add Product</Button>
                    <Table className="table-sm">
						<thead>
							<tr>
								<th>Item#</th>
								<th>Image</th>
								<th>Name</th>
								<th className="text-center">In Stock</th>
								<th className="text-center">Price</th>
							</tr>
						</thead>
						<tbody>
							{products?.length > 0 && products.map(p => 
								<tr key={p.id} className="align-middle">
									<td>
										<Link to={`products/${p.id}`}>
											{p.id}
										</Link>
									</td>
									<td>
										<Image width={50} src={p.image} alt={p.name} fluid className="hover-zoom" />
									</td>
									<td>{p.name}</td>
									<td className="text-center">{p.countInStock}</td>
									<td className="text-end">${p.price.toFixed(2)}</td>
								</tr>)}
						</tbody>
					</Table>
                </>
            }
        </>
	);
};