import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Modules/Home/Home";
import Registration from "./Modules/Registration/Registration";
import Suppliers from "./Modules/Suppliers/Suppliers";
import Products from "./Modules/Suppliers/Products";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ForgetPassword from "./Modules/Login/Components/ForgetPassword/ForgetPassword";
import ProfilePage from "./Modules/ProfilePage/ProfilePage";
import VerifyByEmail from "./Modules/Registration/Components/VerifyByEmail/VerifyByEmail";
import LoginByMobile from "./Modules/Login/Components/LoginByMobile/LoginByMobile";
import Login from "./Modules/Login/Login";
import ResetPassword from "./Modules/ResetPassword/ResetPassword";
import CreateRFQ from "./Modules/Home/BuyerHome/Components/CreateRFQ/CreateRFQ";
import OffersTable from "./Modules/Home/BuyerHome/Components/OffersTable/OffersTable";
// import Login from "./Modules/Login/Login";
//import LoginByEmail from "./Modules/Login/Components/LoginByEmail/LoginByEmail";
function Routes() {
	const { authorization } = useSelector((state) => state.authorization);
	const isAuth = authorization.id ? true : false;
	return (
		<Route
			render={({ location }) => (
				<Switch location={location}>
					<Route exact path="/" render={() => <Home />} />
					<Route
						path="/registration"
						render={() => {
							return isAuth ? <Redirect to="/" /> : <Registration />;
						}}
					/>
					<Route path="/suppliers" render={() => <Suppliers />} />

					<Route
						path="/supplier/:id"
						render={(props) => <Products {...props} />}
					/>
					<Route
						path="/me/:name"
						render={() => {
							return isAuth ? <ProfilePage /> : <Redirect to="/" />;
						}}
					/>
					<Route
						path="/verifyByEmail"
						render={() => {
							return isAuth ? <Redirect to="/" /> : <VerifyByEmail />;
						}}
					/>
					<Route
						path="/loginByMobile"
						render={() => {
							return isAuth ? <Redirect to="/" /> : <LoginByMobile />;
						}}
					/>
					<Route
						path="/forgetpassword"
						render={() => {
							return isAuth ? <Redirect to="/" /> : <ForgetPassword />;
						}}
					/>
					<Route
						path="/loginByEmail"
						render={() => {
							return isAuth ? <Redirect to="/" /> : <Login />;
						}}
					/>
					<Route
						path="/resetpassword"
						render={() => {
							return isAuth ? <Redirect to="/" /> : <ResetPassword />;
						}}
					/>

					<Route
						path="/createrfq"
						render={() => {
							return isAuth &&
								authorization.userTypeId ===
									"4dbe2854-fee8-4466-a9f0-aacf394a5b7e" ? (
								<CreateRFQ />
							) : (
								<Redirect to="/" />
							);
						}}
					/>

					<Route
						path="/offerstable/:id"
						render={() => {
							return isAuth &&
								authorization.userTypeId ===
									"4dbe2854-fee8-4466-a9f0-aacf394a5b7e" ? (
								<OffersTable />
							) : (
								<Redirect to="/" />
							);
						}}
					/>
				</Switch>
			)}
		/>
	);
}

export default Routes;
