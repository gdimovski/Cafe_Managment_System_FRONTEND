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

const Title = styled(Paper)`
  padding: 10px;
  margin-top: 10px;
  border-left: 5px solid gray !important;
  background: whitesmoke !important;
`;

const Container = styled.div`
    width: 80%;
    margin: auto;
`;

const Orders = () => {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3000/rest/all', {
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        })
            .then(data => data.json())
            .then(response => {
                setOrders(response);
            });
    }, []);

    const handleDeleteOrder = id => {
        fetch('http://localhost:3000/rest/orders/delete/'+ id, {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(() => {
                const latestOrders = orders.filter(t => t.id !== id);
                setOrders(latestOrders);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Container>
            <Title><h4>All Orders</h4></Title>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Order Number</TableCell>
                            <TableCell align="left">Table Number</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="left">
                                  <div>  {row.id}</div>
                                </TableCell>
                                <TableCell align="left">
                                <div>  {row.table.id}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <Status active={row.status === "ACTIVE"} />
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        type="submit"
                                        onClick={() => handleDeleteOrder(row.id)}
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

export default Orders;