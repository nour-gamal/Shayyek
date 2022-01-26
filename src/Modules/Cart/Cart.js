import Navbarr from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";

import CartContainer from "./Components/CartContainer/CartContainer";

function Cart() {
	return (
		<section>
			<Navbarr />
			<div className="pps ppe flex-1 d-flex">
				<CartContainer />
			</div>
			<Footer />
		</section>
	);
}

export default Cart;
