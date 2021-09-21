import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Modules/Home/Home";
import Registeration from "./Modules/Registeration/Registration";

function Routes() {
	return (
		<Route
			render={({ location }) => (
				<Switch location={location}>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/registeration" render={() => <Registeration />} />
				</Switch>
			)}
		/>
	);
}

export default Routes;
