import Navbarr from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import CheckoutContainer from "./Components/CheckoutContainer/CheckoutContainer";
import { Redirect } from "react-router-dom";
function Checkout(props) {
	if (!props.location.state) return <Redirect to="/cart" />;
	return (
		<section>
			<Navbarr />
			<div className="pps ppe flex-1 d-flex">
				{props.location.state && (
					<CheckoutContainer
						totalPrice={props.location.state.totalPrice}
						products={props.location.state.products}
					/>
				)}
			</div>
			<Footer />
		</section>
	);
}

export default Checkout;
