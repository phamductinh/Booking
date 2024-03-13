import React, { Component } from "react";
import { connect } from "react-redux";
import { getALLSpecialty } from "../../services/specialtyService";
import "./Specialty.css";
import { withRouter } from "react-router";
import * as actions from "../../store/actions/";

class Specialty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrSpecialty: [],
		};
	}

	async componentDidMount() {
		await this.getALLSpecialtyReact();
	}

	getALLSpecialtyReact = async () => {
		let res = await getALLSpecialty();
		if (res && res.code === 200) {
			this.setState({
				arrSpecialty: res.data,
			});
		}
	};

	handleShowSpecialty = (item) => {
		this.props.history.push(`/specialty/${item.id}`);
	};

	handleNextSpecialty() {
		let lists = document.querySelectorAll(".spec-slide-item");
		document.getElementById("spec-slide").appendChild(lists[0]);
	}
	handlePrevSpecialty() {
		let lists = document.querySelectorAll(".spec-slide-item");
		document.getElementById("spec-slide").prepend(lists[lists.length - 1]);
	}

	render() {
		let { arrSpecialty } = this.state;
		return (
			<>
				<div className="specialty-container">
					<div className="spec-content-up">
						<div className="spec-title">Chuyên khoa phổ biến</div>
						<button className="spec-btn">Xem thêm</button>
					</div>
					<div className="spec-slide-container">
						<div id="spec-slide">
							{arrSpecialty &&
								arrSpecialty.length > 0 &&
								arrSpecialty.map((item, index) => {
									let specialtyImage = new Buffer(
										item.image,
										"base64"
									).toString("binary");
									return (
										<div
											className="spec-slide-item"
											onClick={() =>
												this.handleShowSpecialty(item)
											}
											key={index}
										>
											<div
												className="spec-slide-img"
												style={{
													backgroundImage: `url(${specialtyImage})`,
												}}
											></div>
											<div className="spec-content">
												{item.name}
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="spec-buttons">
						<button
							className="spec-prev"
							id="spec-prev"
							onClick={() => this.handlePrevSpecialty()}
						>
							<i className="fas fa-long-arrow-left"></i>
						</button>
						<button
							className="spec-next"
							id="spec-next"
							onClick={() => this.handleNextSpecialty()}
						>
							<i className="fas fa-long-arrow-right"></i>
						</button>
					</div>
				</div>
			</>
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
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
