import { useEffect } from "react";
import Navbarr from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";
import { getCart } from "./Network";
import { useSelector } from "react-redux";

function Cart() {
	const { authorization } = useSelector((state) => state.authorization);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const isAuth = Object.keys(authorization).length > 0;

	useEffect(() => {
		console.log(authorization);
		let body = { languageId: currentLanguageId };
		if (isAuth) {
		} else {
			body.userId = "s";
		}
		getCart(
			body,
			(success) => {
				console.log(success);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId]);
	return (
		<section>
			<Navbarr />
			Cart
			<Footer />
		</section>
	);
}

export default Cart;
