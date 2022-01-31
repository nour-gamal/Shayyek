import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Radio, Row, Col } from "antd";
import { GetPaymentMethods, AddOrder } from "../../Network";
import { Redirect } from "react-router-dom";
import SuccessModal from "../SuccessModal/SuccessModal";
import "./CheckoutContainer.css";

function CheckoutContainer({ totalPrice, products }) {
	const { currentLocal, currentLanguageId } = useSelector(
		(state) => state.currentLocal
	);
	const [redirectTo, setRedirectTo] = useState(null);
	const [radioValue, setRadioValue] = useState(
		"357e5c60-7eaa-4d0f-bedf-f2e582cb6042"
	);
	const [radioOptions, updateRadioOptions] = useState([]);
	const [isModalVisible, updateModalVisible] = useState(false);
	useEffect(() => {
		GetPaymentMethods({ languageId: currentLanguageId }, (success) => {
			updateRadioOptions(success.data);
		});
	}, [currentLanguageId]);

	const onChange = (e) => {
		setRadioValue(e.target.value);
	};
	const handleAddOrder = () => {
		let body = {
			paymentMethodId: radioValue,
			orderDetails: products,
		};
		AddOrder(
			body,
			(success) => {
				if (success.success) {
					updateModalVisible(true);
				}
			},
			(fail) => {
				console.log(fail);
			}
		);
	};
	if (redirectTo) return <Redirect to={redirectTo} />;
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
			{radioValue === "57745bb2-545e-4bce-ba88-6954b5bb1b0d" && (
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
			)}
			<div className="text-center mb-4">
				<button className="button-primary flat" onClick={handleAddOrder}>
					{currentLocal.suppliers.confirmPayment}
				</button>
				<div className="fw-500 mt-2">
					{currentLocal.suppliers.checkoutFor}
					<span className="totalPrice"> {totalPrice} LE</span>
				</div>
			</div>
			<SuccessModal
				isModalVisible={isModalVisible}
				onCancel={() => {
					updateModalVisible(!isModalVisible);
					setRedirectTo("/");
				}}
			/>
		</div>
	);
}

export default CheckoutContainer;
