import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Modules/Home/Home";
import Registration from "./Modules/Registration/Registration";
import Companies from "./Modules/Companies/Companies";
function Routes() {
	return (
		<Route
			render={({ location }) => (
				<Switch location={location}>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/registration" render={() => <Registration />} />
					<Route path="/companies" render={() => <Companies />} />
				</Switch>
			)}
		/>
	);
}

export default Routes;
