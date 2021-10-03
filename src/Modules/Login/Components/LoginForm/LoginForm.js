import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { loginApi } from "../network";
import { Link } from "react-router-dom";
import "./LoginForm.css";
function LoginForm() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const { authorization } = useSelector((state) => state.authorization);
	const [mobileNumber, setMobileNumber] = useState("");
	const [password, setPassword] = useState("");
	const sendData = (e) => {
		e.preventDefault();
		const body = {
			mobile: mobileNumber,
			password: password,
			fireBaseToken: authorization.deviceToken,
		};
		loginApi(
			body,
			(success) => console.log(success),
			(fail) => console.log(fail),
			false
		);

		setMobileNumber("");
		setPassword("");
	};
	const handleChange = (e) => {
		const id = e.target.id;
		switch (id) {
			case "mobileNumber": {
				setMobileNumber(e.target.value);
				break;
			}
			case "password": {
				setPassword(e.target.value);
				break;
			}
			default:
				break;
		}
	};

	return (
		<Container>
			<form onSubmit={sendData} className="LoginForm">
				<div className="form">
					<div className="w-50">
						<input
							className="input-field"
							placeholder={currentLocal.login.mobileNumber}
							type="number"
							id="mobileNumber"
							value={mobileNumber}
							onChange={handleChange}
						/>
					</div>
					<div className="w-50">
						<input
							className="input-field"
							placeholder={currentLocal.login.password}
							type="password"
							id="password"
							value={password}
							onChange={handleChange}
						/>
					</div>

					<div className="forgetPassword">
						<Link to="/forgetpassword">
							{currentLocal.login.forgetPassword}
						</Link>
					</div>
				</div>
				<div className="button">
					<button type="submit" className="button-primary">
						{currentLocal.login.signin}
					</button>
				</div>
				<div className="checkAccount">
					<span> {currentLocal.login.didHaveAnAcount}</span>
					<span className="mx-2">
						{" "}
						<Link to="/registration"> {currentLocal.login.registerNow} </Link>
					</span>
				</div>
			</form>
		</Container>
	);
}

export default LoginForm;
