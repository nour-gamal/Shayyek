import "./App.css";
import Routes from "./Routes";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";

function App() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	document
		.querySelector("html")
		.setAttribute("dir", currentLocal.language === "English" ? "ltr" : "rtl");

	return (
		<div className="App">
			<Routes />
		</div>
	);
}

export default App;
