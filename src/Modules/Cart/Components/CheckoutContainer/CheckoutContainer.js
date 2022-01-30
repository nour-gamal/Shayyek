import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Radio, Row, Col } from "antd";
import { GetPaymentMethods, AddOrder } from "../../Network";
import SuccessModal from "../SuccessModal/SuccessModal";
import "./CheckoutContainer.css";

function CheckoutContainer({ totalPrice }) {
	const { currentLocal, currentLanguageId } = useSelector(
		(state) => state.currentLocal
	);
	const [radioValue, setRadioValue] = useState(0);
	const [radioOptions, updateRadioOptions] = useState([]);
	const [isModalVisible, updateModalVisible] = useState(true);
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
			orderDetails: [
				{
					productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
					quantity: 0,
					price: 0,
					productSizeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
					productModelId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
				},
			],
		};
		AddOrder(
			body,
			(success) => {
				console.log(success);
			},
			(fail) => {
				console.log(fail);
			}
		);
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
				}}
			/>
		</div>
	);
}

export default CheckoutContainer;
