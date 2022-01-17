import React, { useEffect, useState } from "react";
import ProductCard from "./Components/ProductCard/ProductCard";
import NavBar from "../Common/Navbar/Navbar";
import { getProducts } from "./Network";
import { useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import Footer from "../Common/Footer/Footer";
function Products(props) {
	const { currentLanguageId } = useSelector((state) => state.currentLocal);
	const [products, updateProducts] = useState([]);
	const companyId = props.match.params.id;

	useEffect(() => {
		getProducts(
			currentLanguageId,
			companyId,
			(success) => {
				updateProducts(success.data);
			},
			(fail) => {
				console.log(fail);
			}
		);
	}, [currentLanguageId, companyId]);

	return (
		<section>
			<NavBar />
			<Container className="my-4">
				<Row>
					{products.map((product, i) => {
						return (
							<Col xs={6} sm={4} md={3} lg={2} key={i}>
								<ProductCard product={product} />
							</Col>
						);
					})}
				</Row>
			</Container>

			<Footer />
		</section>
	);
}

export default Products;
