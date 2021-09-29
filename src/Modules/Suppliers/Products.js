import React from "react";
import ProductCard from "./Components/ProductCard/ProductCard";
import NavBar from "../Common/Navbar/Navbar";
import { Container, Col, Row } from "react-bootstrap";
import Footer from "../Common/Footer/Footer";
function Products(props) {
	const id = props.match.params.id;
	console.log(id);

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
