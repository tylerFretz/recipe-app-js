const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
	name: { type: String, required: true, maxLength: [500, 'Ingredient name too long'] },
	measure: { type: String, required: true, maxLength: [300, 'Measure length too long'] }
});

const commentSchema = new mongoose.Schema({
	commentText: { type: String, required: true, maxLength: [20000, 'Comment too long'] },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	dateAdded: { type: Date, default: Date.now },
});

// embedding upvote user refs and comments in model for now as I am not expecting many of either

const recipeSchema = new mongoose.Schema({
	name: { type: String, required: true, maxLength: [100, 'Recipe name too long'] },
	category: { type: String, default: 'Miscellaneous', maxLength: [500, 'Category too long'] },
	area: { type: String, maxLength: [50, 'area too long'] },
	instructions: { type: String, required: true, maxLength: [10000, 'Recipe instructions too long'] },
	ingredients: { type: [ingredientSchema], required: true },
	thumbImageUrl: { type: String, match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ },
	youtubeUrl: { type: String, match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ },
	tags: { type: [String] },
	sourceUrl: { type: String, match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ },
	dateAdded: { type: Date, default: Date.now },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	comments: { type: [commentSchema] },
	upvoteCount: { type: Number, default: 0 },
	upvotedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	summary: { type: String, default: 'Sint Lorem dolore sunt elit esse nostrud aliqua voluptate incididunt ipsum aliquip cillum Lorem ad. Eiusmod veniam eu nulla voluptate duis pariatur esse minim. Dolore dolore officia velit quis elit laborum minim non et et voluptate exercitation irure.', maxLength: [5000, 'Recipe summary too long'] },
	prepTime: { type: Number, min: [0, 'Prep time can\'t be negative'] },
	cookTime: { type: Number, min: [0, 'cook time can\'t be negative'] },
	servings: { type: Number, min: [1, 'Must have at least 1 serving'] },
});

// Override the toJSON method to remove the _id and __v fields
recipeSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Recipe', recipeSchema);