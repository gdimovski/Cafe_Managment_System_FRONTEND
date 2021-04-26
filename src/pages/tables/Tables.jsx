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
import {DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import {Autocomplete} from "@material-ui/lab";
import ReceiptDialog from "./ReceiptDialog";
import _get from 'lodash/get';


const StyledButton = styled(Button)`
  margin-top: 20px !important;
`;

const StyledTextField = styled(TextField)`
  margin-right: 20px !important;
`;


const StyledAutocomplete = styled(Autocomplete)`
  margin-right: 20px !important;
  display: inline-block !important;
`;

const StyledContainer = styled.div`
    margin-bottom: 15px;
`;

const Container = styled.div`
    margin: auto;
    width: 90%;
`;

const StyledActionButton = styled(Button)`
    margin-right: 20px !important;
`;

const Title = styled(Paper)`
  padding: 10px;
  margin-top: 10px;
  border-left: 5px solid gray !important;
  background: whitesmoke !important;
`;

const Tables = () => {
    const [tables, setTables] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [desk, setDesk] = React.useState({});
    const [isOpen, setIsOpen] = React.useState(false);
    const [isReceiptsOpen, setIsReceiptsOpen] = React.useState(false);
    const [items, setItems] = React.useState([]);

    const handleToggleDialog = () => {
        setIsOpen(!isOpen);
    }

    const handleToggleReceiptsDialog = () => {
        setIsReceiptsOpen(!isReceiptsOpen);
        setDesk(null);
    }

    React.useEffect(() => {
        fetch('http://localhost:3000/rest/desks')
            .then(data => data.json())
            .then(response => {
                setTables(response);
            });

        fetch('http://localhost:3000/rest/products')
            .then(data => data.json())
            .then(response => {
                setProducts(response);
            });
    }, []);

    const handleSetValue = (event, index) => {
        const target = event.target;
        const updatedValues = items.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    [target.id]: target.value
                }
            }
            return item;
        })
        setItems(updatedValues);
    }

    const calculateTotalSum = () => {
        return items.reduce((acc, item) => {
            const product = products.find(p => p.id === item.productId);
            const quantity = _get(item, 'quantity');
            const price = _get(product, 'price');

            const value = product && quantity ? quantity * price : 0;
            return acc + value;
        }, 0);
    }

    const handleAddItemsToOrder = () => {
        fetch('http://localhost:3000/rest/desk/'+ desk + '/orders/create', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(items)
        })
            .then(() => {
                const updatedDesks = tables.map(item => {
                    if (item.id === desk) {
                        return {
                            ...item,
                            tableStatus: "BUSY"
                        }
                    }
                    return item;
                });

                setTables(updatedDesks);
                setIsOpen(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleDeleteTable = id => {
        fetch('http://localhost:3000/rest/desks/delete/'+ id, {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(() => {
                const latestTables = tables.filter(t => t.id !== id);
                setTables(latestTables);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleCreateOrder = id => {
        setDesk(id);
        setIsOpen(true);
    };

    const handleOpenCreateReceipt = id => {
        setDesk(id);
        setIsReceiptsOpen(true);
    };

    const handleAddTable = () => {
        fetch('http://localhost:3000/rest/desks/create', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                const latestTables = [...tables, data];
                setTables(latestTables);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Container>
            <Title>
                <h4>Tables: </h4>
            </Title>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Table Number</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left" />
                            <TableCell align="left" />
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tables.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="left">
                                  <div>  {row.id}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <Status active={row.tableStatus === "FREE"} />
                                </TableCell>
                                <TableCell align="left" />
                                <TableCell align="left" />
                                <TableCell align="left">
                                    {row.tableStatus !== "FREE" && (
                                        <StyledActionButton
                                        type="submit"
                                        onClick={() => handleOpenCreateReceipt(row.id)}
                                        variant="outlined"
                                        size="medium"
                                         >
                                            Create Receipt
                                        </StyledActionButton>
                                    )}
                                    <StyledActionButton
                                        type="submit"
                                        onClick={() => handleDeleteTable(row.id)}
                                        variant="outlined"
                                        size="medium"
                                    >
                                        Delete
                                    </StyledActionButton>
                                    {row.tableStatus === "FREE" && (
                                        <StyledActionButton
                                            type="submit"
                                            onClick={() => handleCreateOrder(row.id)}
                                            variant="outlined"
                                            size="medium"
                                        >
                                            Create Order
                                        </StyledActionButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <StyledButton
                type="submit"
                variant="outlined"
                onClick={handleAddTable}
                size="medium"
            >
                Add new table
            </StyledButton>
            <Dialog maxWidth="lg" fullWidth open={isOpen} aria-labelledby="customized-dialog-title" onClose={handleToggleDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleToggleDialog}>
                    Add order items
                </DialogTitle>
                <DialogContent dividers>
                    <form action="#">
                        {items.map((item, index) => {
                            return (
                                <StyledContainer>
                                <StyledAutocomplete
                                    id="productId"
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newInputValue) => {
                                        const updatedValues = items.map((item, i) => {
                                            if (i === index) {
                                                return {
                                                    ...item,
                                                    "productId": newInputValue.id
                                                }
                                            }
                                            return item;
                                        })
                                        setItems(updatedValues);
                                    }}
                                    options={products}
                                    style={{ width: 500 }}
                                    renderInput={(params) => <TextField {...params} label="Select product" variant="outlined" />}
                                />
                                <StyledTextField id="quantity" type="number" label="Quantity" onChange={e => handleSetValue(e, index)}  />

                                </StyledContainer>
                            );
                        })}
                        <div>
                            <Button autoFocus onClick={() => setItems([...items, {}])} color="primary">
                                Add item
                            </Button>
                        </div>
                        <p>Total price: {calculateTotalSum()}</p>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleAddItemsToOrder} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
            {isReceiptsOpen && <ReceiptDialog deskId={desk} isOpen={isReceiptsOpen} handleToggleDialog={handleToggleReceiptsDialog} />}
        </Container>
    );
}

export default Tables;