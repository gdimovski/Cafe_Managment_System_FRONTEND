import * as React from 'react';
import TableBody from "@material-ui/core/TableBody/TableBody";
import Dialog from "@material-ui/core/Dialog";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";
import {DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

const StyledButton = styled(Button)`
  margin-top: 20px !important;
`;
const StyledTextField = styled(TextField)`
  margin-right: 20px !important;
`;

const Container = styled.div`
    width: 90%;
    margin: auto;
`;

const StyledActionButton = styled(Button)`
    margin-right:15px !important;
`;

const Title = styled(Paper)`
  padding: 10px;
  margin-top: 10px;
  border-left: 5px solid gray !important;
  background: whitesmoke !important;
`;

const Products = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const [values, setValues] = React.useState({});
    const [products, setProducts] = React.useState([]);

    const handleToggleDialog = () => {
        setIsOpen(!isOpen);
    }

    const handleSetValue = (event) => {
        const target = event.target;
        setValues({ ...values, [target.id]: target.value });
    }

    React.useEffect(() => {
        fetch('http://localhost:3000/rest/products')
            .then(data => data.json())
            .then(response => {
                setProducts(response);
            });
    }, []);

    const handleDeleteProduct = id => {
        fetch('http://localhost:3000/rest/products/delete/'+ id, {
            method: 'DELETE', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(() => {
                const latestProducts = products.filter(t => t.id !== id);
                setProducts(latestProducts);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleAddProducts = () => {
        fetch('http://localhost:3000/rest/products/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(data => {
                const latestProducts = [...products, data];
                setProducts(latestProducts);
                setIsOpen(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    const handleUpdateProduct = () => {
        fetch('http://localhost:3000/rest/products/update/' + values.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(data => {
                const latestProducts = products.map(item => {
                    if (item.id === values.id) {
                        return data;
                    }
                    return item;
                })

                setProducts(latestProducts);
                setIsOpen(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    const handleEditProduct = id => {
        const product = products.find(p => p.id === id);
        setValues(product);
        setEditMode(true);
        setIsOpen(true);
    };

    return (
        <Container>
            <Title>
                <h4>Products: </h4>
            </Title>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Product Code</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="left">
                                  <div>  {row.code}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <div>  {row.name}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <div>  {row.quantity}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <div>  {row.price}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <StyledActionButton
                                        type="submit"
                                        onClick={() => handleDeleteProduct(row.id)}
                                        variant="outlined"
                                        size="medium"
                                    >
                                        Delete
                                    </StyledActionButton>
                                    <StyledActionButton
                                        type="submit"
                                        onClick={() => handleEditProduct(row.id)}
                                        variant="outlined"
                                        size="medium"
                                    >
                                        Edit
                                    </StyledActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <StyledButton
                type="submit"
                variant="outlined"
                onClick={handleToggleDialog}
                size="medium"
            >
                Add new product
            </StyledButton>
            <Dialog maxWidth="lg" fullWidth open={isOpen} aria-labelledby="customized-dialog-title" onClose={handleToggleDialog}>
                <DialogTitle onClose={handleToggleDialog}>
                    {editMode ? "Edit product" : "Create New Product"}
                </DialogTitle>
                <DialogContent dividers>
                    <form action="#">
                        <StyledTextField id="code" defaultValue={values.code} label="Code" onChange={handleSetValue} />
                        <StyledTextField id="name" defaultValue={values.name} label="Product name" onChange={handleSetValue} />
                        <StyledTextField id="quantity" defaultValue={values.quantity} type="number" label="Quantity" onChange={handleSetValue}  />
                        <StyledTextField id="price" defaultValue={values.price} type="number" label="Price" onChange={handleSetValue} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={editMode ? handleUpdateProduct : handleAddProducts} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Products;