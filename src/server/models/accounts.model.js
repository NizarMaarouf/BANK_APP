const mongoose = require("mongoose");
const validator = require("validator");

const accountSchema = mongoose.Schema({
	credit: { type: Number, default: 0 },
	cash: { type: Number, default: 0 },
	user: {
		id: { type: Number, required: true, unique: true },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
	},
});

// const userSchema = mongoose.Schema({
// 	id: { type: number, required: true, unique: true },
// 	name: { type: String, required: true },
// 	email: { type: String, required: true, unique: true },
// 	validate(value) {
// 		if (!validator.isEmail(value)) {
// 			throw new Error("");
// 		}
// 	},
// });

const accountModel = mongoose.model("Account", accountSchema);
module.exports = accountModel;
