function validateEmail(email) {
	if (email.length > 256) {
		return false;
	}
	let regex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	return regex.test(email);
}

function validatePassword(password) {
	let regex =
		/^(?=.*[A-Z])(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])(?=.*[a-zA-Z]).{8,30}$/;
	return regex.test(password);
}

function validateFullName(fullName) {
	if (fullName.length > 100) {
		return false;
	}
	let regex = /^[a-zA-Z\s]+$/;
	return regex.test(fullName);
}

function validateAddress(address) {
	let regex = /^[a-zA-Z0-9\s,'-]*$/;
	return regex.test(address);
}

module.exports = {
	validateEmail,
	validatePassword,
	validateFullName,
	validateAddress,
};
