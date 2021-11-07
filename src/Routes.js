import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Modules/Home/Home";
import Registration from "./Modules/Registration/Registration";
import Suppliers from "./Modules/Suppliers/Suppliers";
import Products from "./Modules/Suppliers/Products";
// import Login from "./Modules/Login/Login";
import ForgetPassword from "./Modules/Login/Components/ForgetPassword/ForgetPassword";
import ProfilePage from "./Modules/ProfilePage/ProfilePage";
import VerifyByEmail from "./Modules/Registration/Components/VerifyByEmail/VerifyByEmail";
import LoginByMobile from "./Modules/Login/Components/LoginByMobile/LoginByMobile";
import LoginByEmail from "./Modules/Login/Components/LoginByEmail/LoginByEmail";
import ResetPassword from "./Modules/ResetPassword/ResetPassword";

function Routes() {
	return (
		<Route
			render={({ location }) => (
				<Switch location={location}>
					<Route exact path="/" render={() => <Home />} />
				<Route path="/registration" render={() => <Registration />} />
					<Route path="/suppliers" render={() => <Suppliers />} />
					{/* <Route path="/login" render={() => <Login />} /> */}
					{/* <Route path="/forgetpassword" render={() => <ForgetPassword />} /> */}
					<Route
						path="/supplier/:id"
						render={(props) => <Products {...props} />}
					/>
					<Route path="/me/:name" render={() => <ProfilePage />} />
					<Route path="/verifyByEmail" render={() => <VerifyByEmail />} />
					<Route path="/loginByMobile" render={() => <LoginByMobile />} />
					<Route path="/forgetpassword" render={() => <ForgetPassword />} />
					<Route path="/loginByEmail" render={() => <LoginByEmail />} />
					<Route path="/resetpassword" render={() => <ResetPassword />} />
				</Switch>
			)}
		/>
	);
}

export default Routes;
