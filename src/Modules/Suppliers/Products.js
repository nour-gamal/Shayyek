import React, { useEffect } from "react";
import ProductCard from "./Components/ProductCard/ProductCard";
import NavBar from "../Common/Navbar/Navbar";
import { getProducts } from "./Network";
import { useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import Footer from "../Common/Footer/Footer";
function Products(props) {
	const { currentLanguageId } = useSelector((state) => state.currentLocal);

	useEffect(() => {
		const companyId = props.match.params.id;
		getProducts(
			currentLanguageId,
			companyId,
			(success) => {
				console.log(success);
			},
			(fail) => {
				console.log(fail);
			}
		);
	});

	const products = [
		{
			_id: "1",
			image: "https://via.placeholder.com/200",
			name: "Product Name1",
			storeName: "Store Name 2",
			storeImage: "https://via.placeholder.com/200",
		},
	];
	return (
		<section>
			<NavBar />
			<Container className="my-4">
				<Row>
					{products.map((product, i) => {
						return (
							<Col xs={12} sm={6} md={3} key={i}>
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
