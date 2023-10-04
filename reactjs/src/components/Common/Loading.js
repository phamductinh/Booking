import React from "react";
import "./Loading.css";

function LoadingSpinner() {
	return (
		<div className="lds-spinner-container">
			<div className="lds-spinner">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default LoadingSpinner;
