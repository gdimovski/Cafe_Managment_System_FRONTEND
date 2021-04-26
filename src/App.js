import {BrowserRouter, Route, Switch} from "react-router-dom";
import Tables from "./pages/tables/Tables";
import Products from "./pages/products/Products";
import Receipts from "./pages/receipts/Receipts";
import Orders from "./pages/orders/Orders";
import ActiveOrders from "./pages/orders/ActiveOrders";
import Bootstrapper from "./pages/bootstrapper/Bootstrapper";

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
                </Switch>
            </Bootstrapper>
        </BrowserRouter>
    </>
);

export default App;
