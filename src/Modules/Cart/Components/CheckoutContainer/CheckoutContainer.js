import { useSelector } from "react-redux";
import "./CheckoutContainer.css";
function CheckoutContainer() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	return (
		<div className="CheckoutContainer">
			<h6 className="f-18 my-4 title">
				{currentLocal.suppliers.paymentMethod}
			</h6>

			<h6 className="f-18 my-4 title">
				{currentLocal.suppliers.paymentDetails}
			</h6>
		</div>
	);
}

export default CheckoutContainer;
