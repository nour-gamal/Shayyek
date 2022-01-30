import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Radio, Row, Col } from "antd";
import { GetPaymentMethods } from "../../Network";
import "./CheckoutContainer.css";

function CheckoutContainer({ totalPrice }) {
	const { currentLocal, currentLanguageId } = useSelector(
		(state) => state.currentLocal
	);
	const [radioValue, setRadioValue] = useState(1);
	const [radioOptions, updateRadioOptions] = useState([]);

	useEffect(() => {
		GetPaymentMethods({ languageId: currentLanguageId }, (success) => {
			updateRadioOptions(success.data);
		});
	}, [currentLanguageId]);

	const onChange = (e) => {
		setRadioValue(e.target.value);
	};

	return (
		<div className="CheckoutContainer d-flex flex-1 flex-column">
			<div className="my-4">
				<h6 className="f-18 title my-4">
					{currentLocal.suppliers.paymentMethod}
				</h6>
				<Radio.Group onChange={onChange} value={radioValue}>
					{radioOptions.map((option) => (
						<Radio value={option.id} key={option.id} className="m-2 f-14">
							{option.name}
						</Radio>
					))}
				</Radio.Group>
			</div>
			<div className="my-4">
				<h6 className="f-18 my-4 title">
					{currentLocal.suppliers.paymentDetails}
				</h6>
				<Row>
					<Col xs={24} sm={12}>
						<input
							type="number"
							className="form-control m-2"
							placeholder={currentLocal.suppliers.cardNumber}
						/>
					</Col>
					<Col xs={24} sm={12}>
						<input
							type="number"
							className="form-control m-2"
							placeholder={currentLocal.suppliers.CVV}
						/>
					</Col>

					<Col xs={24} sm={12}>
						<input
							type="text"
							className="form-control m-2"
							placeholder={currentLocal.suppliers.name}
						/>
					</Col>
					<Col xs={24} sm={12}>
						<input
							type="text"
							className="form-control m-2"
							placeholder={currentLocal.suppliers.expDate}
						/>
					</Col>
				</Row>
			</div>
			<div className="text-center mb-4">
				<button className="button-primary flat">
					{currentLocal.suppliers.confirmPayment}
				</button>
				<div className="fw-500 mt-2">
					{currentLocal.suppliers.checkoutFor}
					<span className="totalPrice"> {totalPrice} LE</span>
				</div>
			</div>
		</div>
	);
}

export default CheckoutContainer;
