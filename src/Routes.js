import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Modules/Home/Home";
import Registration from "./Modules/Registration/Registration";
import Suppliers from "./Modules/Suppliers/Suppliers";
function Routes() {
	return (
		<Route
			render={({ location }) => (
				<Switch location={location}>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/registration" render={() => <Registration />} />
					<Route path="/suppliers" render={() => <Suppliers />} />
				</Switch>
			)}
		/>
	);
}

export default Routes;
