import * as React from 'react';
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {withRouter} from "react-router-dom";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";
import {TextField} from "@material-ui/core";


const StyledButton = styled(Button)`
  margin-top: 20px !important;
`;

const Container = styled.div`
  width: 30%;
  margin: auto;
  text-align: center;
`;

const StyledTextField = styled(TextField)`
  margin-right: 20px !important;
  display: block !important;
`;

const Title = styled(Paper)`
  padding: 10px;
  margin-top: 10px;
  border-left: 5px solid gray !important;
  background: whitesmoke !important;
`;

const Login = ({ history }) => {
    const [values, setValues] = React.useState({});
    const handleSetValue = (event) => {
        const target = event.target;
        setValues({ ...values, [target.id]: target.value });
    }

    const redRegister = () => {
        history.push("/register")

    }

    const handleLogin = () => {
        fetch('http://localhost:3000/rest/login/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then(() => {
                history.push('/desks')

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    const handleLogout = () => {
        fetch('http://localhost:3000/rest/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(() => {


            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };


    React.useEffect(() => {
        fetch('http://localhost:3000/rest/login')
            .then(data => data.json())
            .then(response => {

            });
    }, []);

    return (
        <>
            <Container>
                <Title>
                    <h4>Login</h4>
                </Title>
                <Paper>
                    <form action="#">
                        <StyledTextField id="username" defaultValue={values.username} label="Username" onChange={handleSetValue} />
                        <StyledTextField id="password" defaultValue={values.password} label="Password" type="password" onChange={handleSetValue} />
                    </form>
                    <StyledButton autoFocus onClick={handleLogin} color="primary">
                        Login
                    </StyledButton>
                    <StyledButton  onClick={redRegister} autoFocus color="primary">
                        Register
                    </StyledButton>



                </Paper>

            </Container>
        </>
    );
}

export default withRouter(Login);