const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const recipeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	category: { type: String },
	area: { type: String },
	instructions: { type: String, required: true },
	ingredients: [{ name: String, measure: String }],
	thumbImageUrl: { type: String, match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ },
	youtubeUrl: { type: String, match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ },
	tags: [String],
	sourceUrl: { type: String, match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ },
	dateAdded: { type: Date, default: Date.now },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	comments: [{ body: String, date: Date }],
	upvotes: { type: Number, default: 0 },
	summary: { type: String },
	prepTime: { type: Number, min: 0 },
	cookTime: { type: Number, min: 0 },
	servings: { type: Number, min: 1 },
});

// Apply the uniqueValidator plugin
recipeSchema.plugin(uniqueValidator);

// Override the toJSON method to remove the _id and __v fields
recipeSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.comments._id;
	}
});

module.exports = mongoose.model("Recipe", recipeSchema);