import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageBooking.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Header/Header";
import LoadingSpinner from "../../../components/Common/Loading";
import {
	confirmBooking,
	deleteBooking,
	getBookingByDate,
} from "../../../services/bookingService";
import * as actions from "../../../store/actions/";

class ManageBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrBooking: [],
			isLoading: false,
			confirmDelete: false,
		};
	}

	async componentDidMount() {}

	handleDeleteUser = async () => {
		let data = {
			fullName: this.state.fullName,
			receiverEmail: this.state.patientEmail,
		};
		try {
			this.setState({
				isLoading: true,
			});
			let res = await deleteBooking(this.state.bookingId, data);
			if (res && res.code === 200) {
				toast.success("Từ chối lịch hẹn thành công !");
				await getBookingByDate(this.state.formatedDate);
				this.setState({
					confirmDelete: false,
					isLoading: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Có gì đó sai sai !");
		}
	};

	handleConfirmBooking = async (item) => {
		try {
			let res = await confirmBooking(item.id);
			if (res && res.code === 200) {
				toast.success("Xác nhận lịch hẹn thành công !");
				await getBookingByDate(this.state.formatedDate);
			}
		} catch (error) {
			console.log(error);
			toast.error("Có gì đó sai sai !");
		}
	};

	handleOnchangeInput = async (event) => {
		let date = event.target.value;
		let formatedDate = new Date(date).getTime();
		this.setState({
			formatedDate: formatedDate,
		});
		let res = await getBookingByDate(formatedDate);
		if (res && res.code === 200) {
			this.setState({
				arrBooking: res.data,
			});
		}
	};

	handleConfirmDelete = (item) => {
		console.log(item);
		this.setState({
			confirmDelete: true,
			bookingId: item.id,
			fullName: item.fullName,
			patientEmail: item.patientEmail,
		});
	};

	handleCloseConfirmDelete() {
		this.setState({
			confirmDelete: false,
		});
	}

	render() {
		let { isLoading, confirmDelete, arrBooking } = this.state;
		let currentDate = new Date().toISOString().split("T")[0];
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="user-container">
					<div className="title text-center">Quản lý đặt lịch</div>
					<div className="mx-3">
						<input
							className="date-choose"
							type="date"
							min={currentDate}
							onChange={(event) =>
								this.handleOnchangeInput(event)
							}
						/>
					</div>
					<div className="users-table mt-3 mx-3">
						<table id="customers">
							<tr>
								<th width="8%" className="text-center">
									Thời gian
								</th>
								<th width="15%" className="text-center">
									Họ và tên
								</th>
								<th width="15%" className="text-center">
									Địa chỉ
								</th>
								<th width="5%" className="text-center">
									Phái
								</th>
								<th width="7%" className="text-center">
									Năm sinh
								</th>
								<th width="10%" className="text-center">
									Số điện thoại
								</th>
								<th width="15%" className="text-center">
									Lý do
								</th>
								<th width="10%" className="text-center">
									Tình trạng
								</th>
								<th width="15%" className="text-center">
									Hành động
								</th>
							</tr>

							{arrBooking &&
								arrBooking.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.booking_time}</td>
											<td>{item.fullName}</td>
											<td>{item.address}</td>
											<td>{item.gender}</td>
											<td>{item.birthday}</td>
											<td>{item.phoneNumber}</td>
											<td>{item.reason}</td>
											<td>{item.status}</td>
											<td className="text-center">
												<button
													className="btn-confirm"
													onClick={() =>
														this.handleConfirmBooking(
															item
														)
													}
												>
													Xác nhận
												</button>
												<button
													className="btn-refuse"
													onClick={() =>
														this.handleConfirmDelete(
															item
														)
													}
												>
													Từ chối
												</button>
											</td>
										</tr>
									);
								})}
						</table>
					</div>

					{confirmDelete ? (
						<div className="confirm-delete">
							<div className="confirmation-text">
								Bạn chắc chắn muốn từ chối chứ?
							</div>
							<div className="button-container">
								<button
									className="cancel-button"
									onClick={() =>
										this.handleCloseConfirmDelete()
									}
								>
									Hủy
								</button>
								<button
									className="confirmation-button"
									onClick={() => this.handleDeleteUser()}
								>
									Từ chối
								</button>
							</div>
						</div>
					) : null}

					{isLoading && <LoadingSpinner />}
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
		userLoginSuccess: (userInfo) =>
			dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
