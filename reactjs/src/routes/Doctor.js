import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ManageBooking from "../containers/System/Doctor/ManageBooking";
class Doctor extends Component {
	render() {
		return (
			<div className="system-container">
				<div className="system-list">
					<Switch>
						<Route
							path="/doctor/manage-booking"
							component={ManageBooking}
						/>
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
