import { Checkbox, Col, Radio, Row } from "antd";
import "./Registration.css";
import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
function Registration() {
	const menu = (
		<Menu>
			<Menu.Item key="0">
				<a href="https://www.antgroup.com">1st menu item</a>
			</Menu.Item>
			<Menu.Item key="1">
				<a href="https://www.aliyun.com">2nd menu item</a>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="3">3rd menu item</Menu.Item>
		</Menu>
	);
	return (
		<div className="Registration">
			<div className="container">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "45px",
					}}
				>
					<div className="f3">Create an Account</div>
					<div>
						<Dropdown overlay={menu} trigger={["click"]}>
							<a
								className="ant-dropdown-link"
								onClick={(e) => e.preventDefault()}
								href="/"
							>
								Click me <DownOutlined />
							</a>
						</Dropdown>
						,
					</div>
				</div>
				<Row>
					<Col span={12}>
						<Radio.Group
							// onChange={onChange} value={value}
							style={{ marginBottom: "40px" }}
						>
							<Radio value={1}>Individual</Radio>
							<Radio value={2} style={{ marginLeft: "180px" }}>
								Company
							</Radio>
						</Radio.Group>
					</Col>
				</Row>
				{/* <input type="text" className="input-field" />
			<button className="button-primary">Click</button> */}
				<Row>
					<Col span={12} md={{ order: 24 }} sm={{ order: 24 }}>
						<input
							type="text"
							className="input-field"
							placeholder="First Name"
						/>
					</Col>
					<Col span={12} md={{ order: 24 }} sm={{ order: 24 }}>
						<input
							type="text"
							className="input-field "
							placeholder="Last Name"
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<input
							className="input-field"
							placeholder="Mobile Number"
							type="number"
						/>
					</Col>
					<Col span={12}>
						<input type="text" className="input-field" placeholder="Role" />
					</Col>
				</Row>
				<Row>
					<Checkbox className="Checkbox-field ">WhatsApp Number</Checkbox>
				</Row>
				{/* <Row>
	        <Col span={12}><input type="email" className="input-field" placeholder="Email"/></Col>
	  <Col span={12}><input className="input-field" placeholder="Company Name"  type="text"/></Col>
	  </Row> */}
				{/* <Row>
	  <Col span={12}><input className="input-field" placeholder="Password"  type="password"/></Col>
      <Col span={12}><input type="password" className="input-field" placeholder="Confirm Password"/></Col>
	  </Row> */}
				{/* <Row>
	  <Col span={12}><input className="input-field" placeholder="Work /Field"  type="text"/></Col>
      <Col span={12}><input type="text" className="input-field" placeholder="Description"/></Col>
	  </Row> */}
				{/* <Row>
	  <Col span={12}><input className="input-field" placeholder="Country"  type="text"/></Col>
      <Col span={12}><input type="text" className="input-field" placeholder="Government"/></Col>
	  </Row> */}
				{/* <Row>
	  <Col span={12}><input className="input-field" placeholder="Address"  type="text"/></Col>
      <Col span={12}><input type="number" className="input-field" placeholder="Company phone number"/></Col>
	  </Row> */}
				{/* <Row>
	  <Col span={12}><input className="input-field" placeholder="سجل تجارى ( Optional )"  type="text"/></Col>
      <Col span={12}><input type="email" className="input-field" placeholder="Upload Company logo ( Optional )"/></Col>
	  </Row> */}
				{/* <Row>
<Checkbox lassName="input-field" >Accept Terms of Service and Privacy Policy</Checkbox>	  </Row> */}
				<Row>
					<Col span={12}>
						<input
							className="input-field"
							placeholder="Password"
							type="password"
						/>
					</Col>
					<Col span={12}>
						<input type="email" className="input-field" placeholder="Email" />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<input
							className="input-field"
							placeholder="Company Name"
							type="text"
						/>
					</Col>
					<Col span={12}>
						<input
							type="password"
							className="input-field"
							placeholder="Confirm Password"
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<input
							className="input-field"
							placeholder="سجل تجارى"
							type="text"
						/>
					</Col>
					<Col span={12}>
						<input
							type="password"
							className="input-field"
							placeholder="Company Mobile Number"
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Checkbox className="Checkbox-field ">
							Accept Terms of Service and Privacy Policy
						</Checkbox>
					</Col>
					<Col span={12}>
						<input
							type="text"
							className="input-field"
							placeholder="Company Webdite (Optional)"
						/>
					</Col>
				</Row>
				<div
					className="button"
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "75px",
					}}
				>
					<button
						className="button-primary"
						style={{ paddingLeft: "144px", paddingRight: "144px" }}
					>
						Register
					</button>
				</div>
			</div>
		</div>
	);
}

export default Registration;
