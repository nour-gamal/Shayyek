import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLocal } from "../../Redux/Localization";
function Home() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const dispatch = useDispatch();

	return (
		<div>
			<button
				onClick={() => {
					dispatch(
						changeLocal(currentLocal.language === "English" ? "ar" : "en")
					);
				}}
			>
				{currentLocal.language}
			</button>
			<h1>{currentLocal.hello}</h1>
		</div>
	);
}

export default Home;
