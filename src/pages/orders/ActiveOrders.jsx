import * as React from 'react';
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";
import {Status} from "../common/Status";

const Container = styled.div`
    width: 80%;
    margin: auto;
`;

const ActiveOrders = () => {
    const [activeOrders, setActiveOrders] = React.useState([]);


    React.useEffect(() => {
        fetch('http://localhost:3000/orders/active')
            .then(data => data.json())
            .then(response => {
                setActiveOrders(response);
            });
    }, []);

    const handleDeleteActiveOrder = id => {
        console.log(id);
    };

    return (
        <Container>
            <h2>Active Orders</h2>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Order Number</TableCell>
                            <TableCell align="left">Table Number</TableCell>
                            <TableCell align="left">Product Code</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeOrders.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="left">
                                  <div>  {row.id}</div>
                                </TableCell>
                                <TableCell align="left">
                                <div>  {row.table.id}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <div>  {row.product.code}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <div>  {row.quantity}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <div>  {row.priceForOrder}$</div>
                                </TableCell>
                                <TableCell align="left">
                                    <Status active={row.status === "ACTIVE"} />
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        type="submit"
                                        onClick={() => handleDeleteActiveOrder(row.id)}
                                        variant="outlined"
                                        size="medium"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

        </Container>
    );
}

export default ActiveOrders;