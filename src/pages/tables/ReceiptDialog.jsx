import * as React from "react";
import {DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import {withRouter} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";

function ReceiptDialog({ deskId, isOpen, handleToggleDialog, history }) {
    const [orders, setOrders] = React.useState([]);
    const createReceipt = () => {
        const orderId = orders[0].order.id;
        fetch('http://localhost:3000/rest/orders/'+ orderId + '/receipts/create', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(data => {
            console.log(data);
                history.push('/receipts')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    React.useEffect(() => {
        if (deskId) {
            fetch('http://localhost:3000/rest/desk/' + deskId + '/orders/all', {
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(data => data.json())
                .then(response => {

                    console.log(response);
                    setOrders(response);
                });
        }
    }, [deskId]);

    const calculateTotalSum = () => {
        return orders.reduce((acc, item) => {
            const value =  item.quantity * item.product.price
            return acc + value;
        }, 0);
    }


    return (
        <Dialog maxWidth="lg" fullWidth open={isOpen} aria-labelledby="customized-dialog-title" onClose={handleToggleDialog}>
            <DialogTitle id="customized-dialog-title" onClose={handleToggleDialog}>
                Create Receipt
            </DialogTitle>
            <DialogContent dividers>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Order Item ID</TableCell>
                                    <TableCell align="left">Product Name</TableCell>
                                    <TableCell align="left">Product Price</TableCell>
                                    <TableCell align="left">Quantity</TableCell>
                                    <TableCell align="left">Item Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">
                                            <div>  {row.id}</div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div> {row.product.name}</div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div> {row.product.price}</div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div> {row.quantity}</div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div> {row.quantity * row.product.price}</div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <p>Total price: {calculateTotalSum()}</p>
                        </Table>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={createReceipt} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withRouter(ReceiptDialog);