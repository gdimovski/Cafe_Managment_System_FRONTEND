import {BrowserRouter, Route, Switch} from "react-router-dom";
import Tables from "./pages/tables/Tables";
import Products from "./pages/products/Products";
import Receipts from "./pages/receipts/Receipts";
import Orders from "./pages/orders/Orders";
import ActiveOrders from "./pages/orders/ActiveOrders";
import Bootstrapper from "./pages/bootstrapper/Bootstrapper";
import Register from "./pages/security/Register";
import Login from "./pages/security/Login";

const App = () => (
    <>
        <BrowserRouter>
            <Bootstrapper>
                <Switch>
                    <Route  exact path="/receipts" component={Receipts} />
                    <Route  exact path="/desks" component={Tables} />
                    <Route  exact path="/products" component={Products} />
                    <Route  exact path="/orders/all" component={Orders} />
                    <Route  exact path="/orders/active" component={ActiveOrders} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Bootstrapper>
        </BrowserRouter>
    </>
);

export default App;
