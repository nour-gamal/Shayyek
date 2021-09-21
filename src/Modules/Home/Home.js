import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLocal } from "../../Redux/Localization";
import Footer from "../Common/Footer/Footer";
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

			<Footer />
		</div>
	);
}

export default Home;
