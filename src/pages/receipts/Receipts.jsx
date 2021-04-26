import * as React from 'react';
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";

const Container = styled.div`
    width: 90%;
    margin: auto;
`;

const Title = styled(Paper)`
  padding: 10px;
  margin-top: 10px;
  border-left: 5px solid gray !important;
  background: whitesmoke !important;
`;

const Receipts = () => {
    const [receipts, setReceipts] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3000/rest/receipts')
            .then(data => data.json())
            .then(response => {
                setReceipts(response);
            });
    }, []);


    const handleDeleteReceipts = id => {
        fetch('http://localhost:3000/rest/receipts/delete/'+ id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(() => {
                const latest = receipts.filter(t => t.id !== id);
                setReceipts(latest);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
        <Container>
            <Title>
                <h4>Receipts: </h4>
            </Title>
            <Paper>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Receipt Id</TableCell>
                            <TableCell align="left">Table Number</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {receipts.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="left">
                                  <div>  {row.id}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <div> {row.order.table.id}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <div> {row.datum.substring(0, 10)}</div>
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        type="submit"
                                        onClick={() => handleDeleteReceipts(row.id)}
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
        </>
    );
}

export default Receipts;
