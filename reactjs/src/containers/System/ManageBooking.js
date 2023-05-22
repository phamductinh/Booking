import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";
import "./ManageBooking.css";
import { Link } from "react-router-dom";

class ManageBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}

	componentDidMount() {
	}

	

	render() {
		return (
			<div className="test">hello</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfor: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		processLogout: () => dispatch(actions.processLogout()),
		userLoginSuccess: (userInfo) =>
			dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
