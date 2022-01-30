import Navbarr from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import CheckoutContainer from "./Components/CheckoutContainer/CheckoutContainer";
function Checkout() {
	return (
		<section>
			<Navbarr />
			<div className="pps ppe flex-1 d-flex">
				<CheckoutContainer />
			</div>
			<Footer />
		</section>
	);
}

export default Checkout;
