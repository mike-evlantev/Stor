import * as React from "react";
import { Col, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

interface Props {
    children: React.ReactElement;
}

export const AdminDashboard: React.FC<Props> = ({children}) => {
    const location = useLocation();
    return (<>
        <h1 className="mb-3">Admin Dashboard</h1>
        <div className="d-flex">
            <Col md={2}>
                <Nav variant="pills" activeKey={location.pathname} className="flex-column" style={{marginRight: "1rem"}}>
                    <Nav.Link href="/admin/orders">Orders</Nav.Link>
                    <Nav.Link href="/admin/products">Products</Nav.Link>
                    <Nav.Link href="/admin/users">Users</Nav.Link>
                </Nav>
            </Col>                    
            <Col md={10}>
                {children}
            </Col>
        </div>
    </>);
}