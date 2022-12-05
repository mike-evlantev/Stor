import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { getProducts } from "../../features/products/productsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Loader } from "../shared/Loader";
import { ProductCard } from "./products/ProductCard";

export const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, products } = useAppSelector(state => state.products);
    console.log(products);

    React.useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            {loading
                ? <Loader />
                : <>
                    <h1>Latest Products</h1>
                    <Row>
                        {products?.length > 0 
                            ? products.map(product => (
                                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                    <ProductCard product={product} />
                                </Col>
                            )) 
                            : <span>No products found</span>}
                    </Row>
                </>
            }
        </>
    );
}