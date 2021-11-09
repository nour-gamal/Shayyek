import React from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import "./PostRFQModal.css";

function PostRFQModal({ isModalVisible, onCancel }) {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	return (
		<Modal
			title="Basic Modal"
			visible={isModalVisible}
			onCancel={onCancel}
			className="modal-lg postRFQModal"
		>
			<label>{currentLocal.buyerHome.invitedByEmail}</label>
			<input
				list="search"
				id="searchValue"
				name="searchValue"
				placeholder={currentLocal.buyerHome.selectSupplierEmail}
				className="form-control mx-3 d-inline"
				// onChange={this.handleSearchOnChange}
				// value={this.state.searchValue}
			/>
			<datalist id="search">
				<option key={1} value={"hello"} />
				<option key={3} value={"myy"} />
				<option key={1} value={"name"} />
			</datalist>
		</Modal>
	);
}

export default PostRFQModal;
