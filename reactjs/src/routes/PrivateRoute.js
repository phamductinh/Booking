import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
	component: Component,
	userInfo,
	allowedRoles,
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			userInfo && allowedRoles.includes(userInfo.role) ? (
				<Component {...props} />
			) : (
				<Redirect to="/home" />
			)
		}
	/>
);

export default PrivateRoute;
