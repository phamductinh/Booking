import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
	render() {
		const isLoggedIn = this.props.isLoggedIn;
		const userInfo = this.props.userInfo;
		if (isLoggedIn) {
			if (userInfo && userInfo.role === "Admin") {
				return <Redirect to={"/system/user-manage"} />;
			} else if (userInfo && userInfo.role === "Doctor") {
				return <Redirect to={"/system/manage-booking"} />;
			} else if (userInfo && userInfo.role === "User") {
				return <Redirect to={"/home"} />;
			}
		} else {
			return <Redirect to={"/home"} />;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
