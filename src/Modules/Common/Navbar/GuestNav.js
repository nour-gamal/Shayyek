import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import languages from "../../../Resources/Assets/languages.svg";
import { changeLocal } from "../../../Redux/Localization";
import { useSelector, useDispatch } from "react-redux";
import AllSuppliers from "../../../Resources/Assets/All_suppliers.svg";
import cart from "../../../Resources/Assets/cart.svg";
import Request_RFQ from "../../../Resources/Assets/Request_RFQ.svg";

function GuestNav() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const dispatch = useDispatch();
	return (
		<Nav className={currentLocal.language === "English" ? "ml-300" : "mr-300"}>
			<div className="centerNav">
				<div className="d-flex">
					<Link to="/suppliers" className="nav-link">
						<img src={AllSuppliers} alt="AllSuppliers" />
						{currentLocal.navbar.AllSuppliers}
					</Link>
					<Nav.Link href="#link">
						<img src={Request_RFQ} alt="Request_RFQ" />
						{currentLocal.navbar.requestRFQ}
					</Nav.Link>
					<Nav.Link href="#link">
						<img src={cart} alt="cart" />
						{currentLocal.navbar.cart}
					</Nav.Link>
				</div>
				<div className="d-flex  actionNav">
					<Link to="/loginByEmail" className="nav-link">
						{currentLocal.navbar.signin}
					</Link>
					<Link to="/registration" className="nav-link register_btn">
						{/* <Nav.Link href="/registration"> */}
						{currentLocal.navbar.register}
					</Link>
				</div>
			</div>
			<div className="endNav">
				<Nav.Link href="#" className="pl-28 pr-28">
					{currentLocal.navbar.contactUs}
				</Nav.Link>
				<Nav.Link href="#">
					<img
						src={languages}
						alt="languages"
						className="langIcon"
						onClick={() => {
							dispatch(
								changeLocal(currentLocal.language === "English" ? "ar" : "en")
							);
						}}
					/>
					<span className="px-2">
						{currentLocal.language === "العربيه" ? "عربي" : "En"}
					</span>
				</Nav.Link>
			</div>
		</Nav>
	);
}

export default GuestNav;
