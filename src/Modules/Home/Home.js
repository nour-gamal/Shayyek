import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Authorization";
import Navbar from "../Common/Navbar/Navbar";
import { loginFun, getAllUsers, userProfile } from "./network";
function Home() {
	const dispatch = useDispatch();

	useEffect(() => {
		const body = {
			email: "nmg18196@hotmail.com",
			password: "Asd@123",
		};

		loginFun(
			body,
			(res) => {
				dispatch(login(res.user));
			},
			(e) => {
				console.log(e);
			},
			false
		);

		getAllUsers(
			(res) => {
				//console.log(res);
			},
			(e) => {
				//console.log(e);
			},
			false
		);

		userProfile(
			(res) => {
				//console.log(res);
			},
			(e) => {
				//console.log(e);
			}
		);
	}, [dispatch]);

	return (
		<div>
			<Navbar />
		</div>
	);
}

export default Home;
