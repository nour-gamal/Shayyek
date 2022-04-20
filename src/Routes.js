import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Modules/Home/Home";
import Registration from "./Modules/Registration/Registration";
import Suppliers from "./Modules/Suppliers/Suppliers";
import Products from "./Modules/Suppliers/Products";
import ForgetPassword from "./Modules/Login/Components/ForgetPassword/ForgetPassword";
import ProfilePage from "./Modules/ProfilePage/ProfilePage";
import BuyerSeeProfiles from "./Modules/ProfilePage/BuyerSeeProfiles";
import VerifyByEmail from "./Modules/Registration/Components/VerifyByEmail/VerifyByEmail";
import LoginByMobile from "./Modules/Login/Components/LoginByMobile/LoginByMobile";
import Login from "./Modules/Login/Login";
import ResetPassword from "./Modules/ResetPassword/ResetPassword";
import CreateRFQ from "./Modules/Home/BuyerHome/CreateRFQ";
import OffersTable from "./Modules/Home/BuyerHome/Components/OffersTable/OffersTable";
import ManageCompany from "./Modules/ProfilePage/Components/SubComponents/ManageCompany/ManageCompany";
import { authorType } from "./helpers/authType";
import AdminViewSupplier from "./Modules/ProfilePage/Components/SubComponents/AdminViewSupplier/AdminViewSupplier";
import Cart from "./Modules/Cart/Cart";
import Checkout from "./Modules/Cart/Checkout";
import Messages from "./Modules/Messages/Messages";
import { getToken } from "./Services";
// import Login from "./Modules/Login/Login";
//import LoginByEmail from "./Modules/Login/Components/LoginByEmail/LoginByEmail";
function Routes() {
	const {
		authorization,
		authorization: { accountTypeId, roleId, userTypeId },
	} = useSelector((state) => state.authorization);
	const isAuth = authorization.id ? true : false;
	let companyAdmin;
	if (accountTypeId) {
		var authTypeName = authorType(accountTypeId, userTypeId, roleId);
		companyAdmin = authTypeName?.includes("company_admin");
		var isBuyer = authTypeName.includes("buyer");
	}
	const isGuestOrBuyer = !accountTypeId || authTypeName?.includes("buyer");

	getToken(authorization?.token);
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
					<Route
						path="/suppliers"
						render={() => {
							return isGuestOrBuyer ? <Suppliers /> : <Redirect to="/" />;
						}}
					/>
					<Route
						path="/supplier/:id"
						render={(props) => {
							return isGuestOrBuyer ? (
								<Products {...props} />
							) : (
								<Redirect to="/" />
							);
						}}
					/>
					<Route
						path="/Cart"
						render={() => {
							return isGuestOrBuyer ? <Cart /> : <Redirect to="/" />;
						}}
					/>
					<Route
						path="/Checkout"
						render={(props) => {
							return isGuestOrBuyer && isAuth ? (
								<Checkout {...props} />
							) : (
								<Redirect to="/" />
							);
						}}
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
						render={(props) => {
							return isAuth && authTypeName.includes("buyer") ? (
								<CreateRFQ {...props} />
							) : (
								<Redirect to="/" />
							);
						}}
					/>
					<Route
						path="/offerstable/:id"
						render={(props) => {
							return isAuth &&
								authorization.userTypeId ===
									"4dbe2854-fee8-4466-a9f0-aacf394a5b7e" ? (
								<OffersTable {...props} />
							) : (
								<Redirect to="/" />
							);
						}}
					/>{" "}
					<Route
						path="/suppliercontractorprofiles"
						render={(props) =>
							isAuth && isBuyer ? (
								<BuyerSeeProfiles {...props} />
							) : (
								<Redirect to="/" />
							)
						}
					/>
					<Route
						path="/company/:name"
						render={() =>
							isAuth && companyAdmin ? <ManageCompany /> : <Redirect to="/" />
						}
					/>
					<Route
						path="/view/:name"
						render={(props) =>
							isAuth && companyAdmin ? (
								<AdminViewSupplier {...props} />
							) : (
								<Redirect to="/" />
							)
						}
					/>
					<Route
						path="/reset-password/:name"
						render={(props) =>
							isAuth && companyAdmin ? (
								<ResetPassword {...props} />
							) : (
								<Redirect to="/" />
							)
						}
					/>
					<Route
						path="/chat"
						render={(props) =>
							isAuth ? <Messages {...props} /> : <Redirect to="/" />
						}
					/>
				</Switch>
			)}
		/>
	);
}

export default Routes;
