import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Navbar from "../../../../Common/Navbar/Navbar";
import logo from "../../../../../Resources/Assets/no-profile-img-240x300.gif";
import { searchCompany } from "../../../network";
import StarsRating from "stars-rating";
// import { Rate } from "rsuite";
import SearchShayyek from "../../../../../Resources/Assets/Search Shayyek.svg";
import "./LandingPage.css";
function LandingPage() {
	const { currentLocal } = useSelector((state) => state.currentLocal);
	const [searchWord, setSearchWord] = useState("");
	const [searchList, setSearchList] = useState([]);
	const [searshResult, setSearshResult] = useState(false);
	const { currentLanguageId } = useSelector((state) => state.currentLocal);

	const SearchFun = (e) => {
		setSearchWord(e.target.value);
		searchCompany(
			currentLanguageId,
			e.target.value,
			(success) => {
				if (success.data === null) {
					setSearshResult(false);
				} else {
					setSearshResult(true);
				}
				console.log(success.data.length === 0);
				setSearchList(success.data);
			},
			(fail) => {},
			false
		);
	};

	useEffect(() => {
		localStorage.setItem("landingPage", LandingPage);
	}, []);

	return (
		<>
			<div className="overlay"></div>
			<div className="landingPage">
				<Navbar transparent={true} />
				<Container>
					<Row>
						<Col md={6} xs={12}>
							<h2 className="text-white my-0 f-27">
								{currentLocal.home.shayek}
							</h2>
							<p className="text-white f-21 mb-4 fw-light">
								{currentLocal.home.optimizingProcurement}
							</p>
						</Col>
					</Row>
					<Row>
						<Col
							md={6}
							xs={12}
							className={
								currentLocal.language === "العربيه" && "procurementManagement"
							}
						>
							<h3 className="f-27 my-0">
								{currentLocal.home.verifiedConnectedStreamlined}
							</h3>
							<p className="text-white f-21 mb-5 fw-light">
								{currentLocal.home.procurementManagement}
							</p>
						</Col>
					</Row>
					<Row>
						<div className="search w-100">
							<div>
								<input
									type="search"
									value={searchWord}
									onChange={SearchFun}
									className={searshResult && "selectInput"}
								/>
							</div>
							<img
								src={SearchShayyek}
								alt="SearchShayyek"
								className="SearchShayyek"
							/>
						</div>
					</Row>
					<Row className="liveBoxContainer">
						<Col md={6} xs={12}>
							<Row>
								<Col md={6} xs={12}>
									<div
										className={
											currentLocal.language === "العربيه"
												? "btnArb button"
												: "button"
										}
									>
										<button className="button-primary f-21  fw-bold">
											{currentLocal.home.live}
										</button>
									</div>
								</Col>
								<Col md={6} xs={12}>
									<div className="lastUpdatStock">
										<p className="text-white f-14">
											{currentLocal.home.Updated}

											<span> {currentLocal.home.today} </span>
										</p>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
					{searshResult && (
						<div className="searchResult">
							{searchList.map((search) => {
								return (
									<div key={search.id} className="searchResultBox mb-3">
										<Row>
											<Col md={8} xs={8} className="companyInfo">
												<img src={logo} alt={logo} className="rounded-circle" />
												<p className="searchName"> {search.name}</p>
											</Col>

											<Col md={4} xs={4}>
												<StarsRating
													count={5}
													value={search.rate}
													size={24}
													color2={"#ffd700"}
													edit={false}
													className="stars"
												/>
											</Col>
										</Row>
									</div>
								);
							})}
						</div>
					)}
				</Container>
			</div>
		</>
	);
}

export default LandingPage;
