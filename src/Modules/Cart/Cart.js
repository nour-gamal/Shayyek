import { useEffect, useState } from "react";
import Navbarr from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import { getCart } from "./Network";
import { useSelector } from "react-redux";
import CartContainer from "./Components/CartContainer/CartContainer";

function Cart() {
	const {
		deviceToken: { deviceToken },
		authorization,
	} = useSelector((state) => state.authorization);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [products, updateProducts] = useState([]);
	const isAuth = Object.keys(authorization).length > 0;

	useEffect(() => {
		console.log(authorization);
		let body = {
			languageId: currentLanguageId,
			deviceId: deviceToken,
			userId: isAuth ? authorization.id : "",
		};

		getCart(
			body,
			(success) => {
				updateProducts(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId, authorization, deviceToken, isAuth]);
	return (
		<section>
			<Navbarr />
			<div className="pps ppe">
				<CartContainer products={products} />
			</div>
			<Footer />
		</section>
	);
}

export default Cart;
