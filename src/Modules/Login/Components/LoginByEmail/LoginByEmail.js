import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loginApi } from "../../network";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../../../../Redux/Authorization";
import "./LoginByEmail.css";

function LoginByEmail({signinByEmail}) {
	const dispatch = useDispatch();
	const { currentLocal } = useSelector((state) => state.currentLocal);
	// const { authorization } = useSelector((state) => state.authorization);
	const { deviceToken } = useSelector((state) => state.authorization);
	const [email, setEmail] = useState("");
	const [alert, setAlert] = useState("");
	const [password, setPassword] = useState("");
	const [verrifayState, setVerrifayState] = useState(false);

	const [redirect, setRedirect] = useState(false);
	const sendData = (e) => {
		e.preventDefault();
		if (!email || !password) {
			setAlert(true);
		} else {
			setAlert(false);
			const body = {
				email: email,
				password: password,
				fireBaseToken: deviceToken.deviceToken,
			};
			loginApi(
				body,
				(success) => {
					dispatch(login(success.data));
					if(success.ErrorStatus===1){  //EmailVerrifay
						setVerrifayState(true)
					}
					if (success) {
						console.log(success);
						setRedirect(true);
					}
				},
				(fail) => console.log(fail),
				false
			);
		}
	};
	const handleChange = (e) => {
		const id = e.target.id;
		switch (id) {
			case "email": {
				setEmail(e.target.value);
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
	if (redirect) {
		return <Redirect to="/" />;
	}
	return (
		<div className="loginByEmail ppl ppr">
			<Container fluid>
				<form onSubmit={sendData} className="LoginForm">
					<div className="form">
						<div className="w-50">
							<p className="errorMsg">
								{alert && !email && <>* {currentLocal.login.emailIsRequired}</>}
							</p>
							<input
								className={
									alert && !email
										? "error input-field form-control my-1"
										: "input-field form-control my-1"
								}
								placeholder={currentLocal.login.email}
								type="email"
								id="email"
								value={email}
								onChange={handleChange}
							/>
						</div>
						<div className="w-50">
							<p className="errorMsg">
								{alert && !password && (
									<>* {currentLocal.login.passwordIsRequired}</>
								)}
							</p>
							<input
								className={
									alert && !password
										? "error input-field form-control"
										: "input-field form-control"
								}
								placeholder={currentLocal.login.password}
								type="password"
								id="password"
								value={password}
								onChange={handleChange}
							/>
						</div>

						<div className="forgetPassword py-2">
							<Link to="/forgetpassword" className="f-12">
								{currentLocal.login.forgetPassword}
							</Link>
						</div>
						<div className="loginByMobileLink" onClick={()=>{
							signinByEmail("signinMobile")
						}}>
							{/* <Link to="/loginByMobile" className="f-12"> */}
								{currentLocal.login.signInWithMobileNumber}
							{/* </Link> */}
						</div>
					</div>
					<div className="button">
						<button type="submit" className="button-primary" onClick={sendData}>
							{verrifayState?currentLocal.login.verifyYourMailNow:currentLocal.login.signin}
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
		</div>
	);
}

export default LoginByEmail;
