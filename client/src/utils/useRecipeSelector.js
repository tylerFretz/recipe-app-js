import { useSelector } from "react-redux";
import { compareAsc } from "date-fns";

const filterResults = (results, queryObject) => {
	switch (queryObject) {
	case queryObject.name:
		return results.filter(recipe => recipe.name === queryObject.name);
	case queryObject.area:
		return results.filter(recipe => recipe.area === queryObject.area);
	case queryObject.category:
		return results.filter(recipe => recipe.category === queryObject.category);
	case queryObject.tag:
		return results.filter(recipe => recipe.tags.some(t => t === queryObject.tag));
	case queryObject.sortBy && queryObject.sortBy === "upvoteCount":
		return results.sort((a, b) => a.upvoteCount - b.upvoteCount);
	case queryObject.sortBy && queryObject.sortBy === "dateAdded":
		return results.sort((a, b) => compareAsc(new Date(b.dateAdded), new Date(a.dateAdded)));
	default:
		return results;
	}
};

const useRecipeSelector = (queryObject) => {
	return useSelector(state => filterResults(state.recipes, queryObject));
};

export default useRecipeSelector;