const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
	name: { type: String, required: true, maxLength: [500, "Ingredient name too long"] },
	measure: { type: String, required: true, maxLength: [300, "Measure length too long"] }
});

const commentSchema = new mongoose.Schema({
	body: { type: String, required: true, maxLength: [20000, "Comment too long"] },
	date: { type: Date, default: Date.now }
});

const recipeSchema = new mongoose.Schema({
	name: { type: String, required: true, maxLength: [100, "Recipe name too long"] },
	category: { type: String, default: "Miscellaneous", maxLength: [500, "Category too long"] },
	area: { type: String, maxLength: [50, "area too long"] },
	instructions: { type: String, required: true, maxLength: [10000, "Recipe instructions too long"] },
	ingredients: { type: [ingredientSchema], required: true, default: undefined },
	thumbImageUrl: { type: String, match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ },
	youtubeUrl: { type: String, match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ },
	tags: { type: [String], default: undefined },
	sourceUrl: { type: String, match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ },
	dateAdded: { type: Date, default: Date.now },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	comments: { type: [commentSchema], default: undefined },
	upvotes: { type: Number, default: 0 },
	summary: { type: String, default: "I guess the creator did not provide a summary ¯\\_(ツ)_/¯.", maxLength: [5000, "Recipe summary too long"] },
	prepTime: { type: Number, min: [0, "Prep time can't be negative"] },
	cookTime: { type: Number, min: [0, "cook time can't be negative"] },
	servings: { type: Number, min: [1, "Must have at least 1 serving"] },
});

// Override the toJSON method to remove the _id and __v fields
recipeSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model("Recipe", recipeSchema);