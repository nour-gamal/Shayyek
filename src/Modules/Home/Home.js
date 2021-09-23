import React, { useEffect } from "react";
import Navbar from "../Common/Navbar/Navbar";
import { login } from "./network";
function Home() {
	useEffect(() => {
		const body = {
			email: "nmg181963@hotmail.com",
			password: "GoodOne",
		};

		login(
			body,
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
