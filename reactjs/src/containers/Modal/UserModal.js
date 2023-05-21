import React from "react";

export default function UserModal(props) {
	const handleChangeModalInput = (event) => {
		const { name, value } = event.target;
		props.handleOnchangeModalInput(name, value);
	};
	return (
		<div id="add-new-modal" className="modal">
			<div className="modal-content">
				<p>Add new user</p>
				<input
					className="email"
					type="email"
					placeholder="Email"
					value={props.newEmail}
					onChange={handleChangeModalInput}
				/>
				<div className="pass-field">
					<input
						className="password"
						type="password"
						autoComplete="off"
						placeholder="Password"
						value={props.newPassword}
						onChange={(event) =>
							props.handleOnchangeModalInput(event, "newEmail")
						}
					/>
					<input
						className="confirm-password"
						type="password"
						autoComplete="off"
						placeholder="Confirm Password"
						value={props.confirmPass}
						onChange={(event) =>
							props.handleOnchangeModalInput(event, "confirmPass")
						}
					/>
				</div>
				<input
					className="fullname"
					name="fullName"
					type="text"
					placeholder="Fullname"
					value={props.fullName}
					onChange={(event) =>
						props.handleOnchangeModalInput(event, "fullName")
					}
				/>
				<input
					className="address"
					name="address"
					type="text"
					placeholder="Address"
					value={props.address}
					onChange={(event) =>
						props.handleOnchangeModalInput(event, "address")
					}
				/>

				<div className="modal-select">
					<input
						className="phoneNumber"
						type="tel"
						placeholder="Phone"
						value={props.phoneNumber}
						onChange={(event) =>
							props.handleOnchangeModalInput(event, "phoneNumber")
						}
					/>
					<select
						name="gender"
						id="gender-select"
						value={props.gender}
						onChange={(event) =>
							props.handleOnchangeModalInput(event, "gender")
						}
					>
						<option value="" disabled>
							Gender
						</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>

					<select
						name="role"
						id="role-select"
						value={props.role}
						onChange={(event) =>
							props.handleOnchangeModalInput(event, "role")
						}
					>
						<option value="" disabled>
							Role
						</option>
						<option value="Admin">Admin</option>
						<option value="Doctor">Doctor</option>
						<option value="User">User</option>
					</select>
				</div>

				<div className="modal-btn">
					<button
						className="btn-add-new"
						type="button"
						onClick={props.handleAddUser}
					>
						Add
					</button>
					<button
						className="btn-cancel"
						type="button"
						onClick={props.handleCloseModal}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
