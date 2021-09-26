import React, { useEffect } from "react";
import Navbar from "../Common/Navbar/Navbar";
import { login, getAllUsers, userProfile } from "./network";
function Home() {
	useEffect(() => {
		const body = {
			email: "nmg18196@hotmail.com",
			password: "Asd@123",
		};

		login(
			body,
			(res) => {
				console.log(res);
			},
			(e) => {
				console.log(e);
			},
			false
		);

		getAllUsers(
			(res) => {
				console.log(res);
			},
			(e) => {
				console.log(e);
			},
			false
		);

		userProfile(
			(res) => {
				console.log(res);
			},
			(e) => {
				console.log(e);
			}
		);
	}, []);

	return (
		<div>
			<Navbar />
		</div>
	);
}

export default Home;
