import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import ManageTelemedicine from "../containers/System/ManageTelemedicine";
import ManageSpecialty from "../containers/System/ManageSpecialty";

class System extends Component {
	render() {
		const { systemMenuPath } = this.props;
		return (
			<div className="system-container">
				<div className="system-list">
					<Switch>
						<Route
							path="/system/user-manage"
							component={UserManage}
						/>
						<Route
							path="/system/manage-telemedicine"
							component={ManageTelemedicine}
						/>
						<Route
							path="/system/manage-specialty"
							component={ManageSpecialty}
						/>
						<Route
							component={() => {
								return <Redirect to={systemMenuPath} />;
							}}
						/>
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		systemMenuPath: state.app.systemMenuPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
