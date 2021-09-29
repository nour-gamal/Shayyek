import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Modules/Home/Home";
import Registration from "./Modules/Registration/Registration";
import Suppliers from "./Modules/Suppliers/Suppliers";
import Products from "./Modules/Suppliers/Products";
import Login from "./Modules/Login/Login";

function Routes() {
	return (
		<Route
			render={({ location }) => (
				<Switch location={location}>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/registration" render={() => <Registration />} />
					<Route path="/suppliers" render={() => <Suppliers />} />
					<Route path="/login" render={() => <Login />} />
					<Route
						path="/supplier/:id"
						render={(props) => <Products {...props} />}
					/>
				</Switch>
			)}
		/>
	);
}

export default Routes;
