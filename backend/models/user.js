const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, match: /[a-zA-Z0-9]{3,50}/ },
	passwordHash: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	submittedRecipes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Recipe"
		}
	],
	savedRecipes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Recipe"
		}
	],
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

// Override the toJSON method to remove the _id, __v and passwordHash fields
userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	}
});

module.exports = mongoose.model("User", userSchema);