import "./App.css";
import Routes from "./Routes";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import '@progress/kendo-theme-default/dist/all.css';

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
