const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userExtractor = async (request, response, next) => {
	if (!(request.token === null)) {
		const decodedToken = jwt.verify(request.token, process.env.SECRET);
		if (!decodedToken.id) {
			request.user = null;
		} else {
			request.user = await User.findOne({ _id: decodedToken.id });
		}
		next();
	} else {
		request.user = null;
		next();
	}
};

module.exports = { userExtractor };
