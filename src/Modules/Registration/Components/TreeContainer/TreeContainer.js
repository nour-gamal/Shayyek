import React, { Component } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import isEqual from "lodash/isEqual";

export default class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			disabled: props.disabled,
			className: props.className,
		};
	}

	componentWillReceiveProps = (nextProps) => {
		if (!isEqual(nextProps.data, this.state.data)) {
			this.setState({ data: nextProps.data });
		}
		if (!isEqual(nextProps.disabled, this.state.disabled)) {
			this.setState({ disabled: nextProps.disabled });
		}
		if (!isEqual(nextProps.className, this.state.className)) {
			this.setState({ className: nextProps.className });
		}
	};

	shouldComponentUpdate = (nextProps) => {
		return (
			!isEqual(nextProps.data, this.state.data) ||
			!isEqual(nextProps.disabled, this.state.disabled) ||
			!isEqual(nextProps.className, this.state.className)
		);
	};

	render() {
		const { data, ...rest } = this.props;
		return <DropdownTreeSelect data={this.state.data} {...rest} />;
	}
}
