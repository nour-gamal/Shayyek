import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { IsUserAdmin, loginApi } from "../../network";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../../../../Redux/Authorization";
import { setStoreData } from "../../../../Services";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import "./LoginByEmail.css";

function LoginByEmail({ signinByEmail, rejection, holding }) {
	const dispatch = useDispatch();
	const { currentLocal } = useSelector((state) => state.currentLocal);
	// const { authorization } = useSelector((state) => state.authorization);
	const { deviceToken, deviceId } = useSelector((state) => state.authorization);
	const [email, setEmail] = useState("");
	const [alert, setAlert] = useState("");
	const [password, setPassword] = useState("");
	const [verrifayState, setVerrifayState] = useState(false);
	const [wrongPassState, setWrongPassState] = useState(false);
	const [wrongEmailState, setWrongEmailState] = useState(false);
	// const [holdingState, setHoldingState] = useState(false);
	const [adminState, setAdminState] = useState(true);
	const [redirect, setRedirect] = useState(false);
	const resendData = (e) => {
		e.preventDefault();
		setAlert(false);
		setVerrifayState(false);
	};
	const setUserFBData = async (userId, name) => {
		const userDocRef = doc(db, "users", userId);
		const docSnap = await getDoc(userDocRef);
		if (docSnap.exists()) {
			let data = docSnap.data();
			if (!("friends" in data)) {
				await setDoc(userDocRef, {
					name,
					friends: [],
					myImage: null,
					id: userId,
				});
			}
		}
	};

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
				deviceId: deviceId.deviceId,
			};
			loginApi(
				body,
				(success) => {
					if (success.success) {
						const { id, fullName } = success.data;
						dispatch(login(success.data));
						setStoreData(success.data.token);
						setUserFBData(id, fullName);
						setRedirect(true);
					} else if (!success.success && success.data.errorStatus === 1) {
						//email Not verrify
						setVerrifayState(success.message);
					} else if (!success.success && success.data.errorStatus === 3) {
						setWrongPassState(success.message);
					} else if (!success.success && success.data.errorStatus === 6) {
						setWrongEmailState(success.message);
					} else if (!success.success && success.data.errorStatus === 4) {
						rejection("rejection");
						holding(success.message);
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
	const isUserAdmin = () => {
		IsUserAdmin(
			email,
			(success) => {
				if (!success.data) {
					setAdminState(success.data);
				}
			},
			(fail) => console.log(fail),
			false
		);
	};

	if (redirect) {
		return <Redirect to="/" />;
	}

	return (
		<div className="loginByEmail ppl ppr">
			<Container fluid>
				<form
					onSubmit={verrifayState ? resendData : sendData}
					className="LoginForm"
				>
					<div className="form">
						<div className="w-50">
							<p className="errorMsg">
								{alert && !email && <>* {currentLocal.login.emailIsRequired}</>}
								{verrifayState && verrifayState}
								{wrongEmailState && wrongEmailState}
							</p>
							<input
								className={
									(alert && !email) || verrifayState || wrongEmailState
										? "error input-field form-control my-1"
										: "input-field form-control my-1"
								}
								placeholder={currentLocal.login.email}
								type="email"
								id="email"
								value={email}
								onChange={handleChange}
								onBlur={isUserAdmin}
							/>
						</div>
						<div className="w-50">
							<p className="errorMsg">
								{alert && !password && (
									<>* {currentLocal.login.passwordIsRequired}</>
								)}
								{wrongPassState && wrongPassState}
							</p>
							<input
								className={
									(alert && !password) || wrongPassState
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
								{!adminState ||
									(!verrifayState && currentLocal.login.forgetPassword)}
							</Link>
						</div>
						<div
							className="loginByMobileLink"
							onClick={() => {
								signinByEmail("signinMobile");
							}}
						>
							{/* <Link to="/loginByMobile" className="f-12"> */}
							{currentLocal.login.signInWithMobileNumber}
							{/* </Link> */}
						</div>
					</div>
					<div className="button">
						<button type="submit" className="button-primary">
							{verrifayState
								? currentLocal.login.verifyYourMailNow
								: currentLocal.login.signin}
						</button>
					</div>
					<div className="checkAccount">
						<span> {currentLocal.login.didHaveAnAcount}</span>
						<span className="mx-2">
							<Link to="/registration"> {currentLocal.login.registerNow} </Link>
						</span>
					</div>
				</form>
			</Container>
		</div>
	);
}

export default LoginByEmail;
