import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Modules/Home/Home";
import Registration from "./Modules/Registration/Registration";
import Suppliers from "./Modules/Suppliers/Suppliers";
import Products from "./Modules/Suppliers/Products";
import Login from "./Modules/Login/Login";
import ForgetPassword from "./Modules/ForgetPassword/ForgetPassword";
import ProfilePage from "./Modules/ProfilePage/ProfilePage";
import VerifyByEmail from "./Modules/Registration/Components/VerifyByEmail/VerifyByEmail";

function Routes() {
	return (
		<Route
			render={({ location }) => (
				<Switch location={location}>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/registration" render={() => <Registration />} />
					<Route path="/suppliers" render={() => <Suppliers />} />
					<Route path="/login" render={() => <Login />} />
					<Route path="/forgetpassword" render={() => <ForgetPassword />} />
					<Route
						path="/supplier/:id"
						render={(props) => <Products {...props} />}
					/>
					<Route path="/me/:name" render={() => <ProfilePage />} />
					<Route path="/verifyByEmail" render={() => <VerifyByEmail />} />
				</Switch>
			)}
		/>
	);
}

export default Routes;
