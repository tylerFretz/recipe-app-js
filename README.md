# Recipe App

Full-stack MERN recipe CRUD app. Back-end is an express API to a MongoDB database with hundreds of recipes. It also serves the front-end's static react files. 

This was the first MERN stack app I built after finishing [FullStackOpen](https://fullstackopen.com/en/).

Initial database data was populated using the amazing API at [TheMealDB](https://www.themealdb.com/). Unfortunately I found the structure of the data returned from this API difficult to work with, so I scraped it, reformatted it, and put it into my own database.

Live site hosted on Heroku at [https://fathomless-hamlet-32500.herokuapp.com](https://fathomless-hamlet-32500.herokuapp.com)

## Features (front-end)
- Mobile-first responsive design
- Consistent theming using Material UI
- Responsive forms using Formik and Yup
- Search recipes based on category, tag, area, name, popularity, date added, or any combination of the above
- HTTP responses are cached using React Query to limit the amount of requests
- User's can add easily add avatars using drag-and-drop file upload 
- Ability to save favourite recipes, create new recipes, and discuss with others
- Embedded YouTube player for recipe demonstration videos
- Compressed image assets to reduce initial load time


## Features (back-end)
- API Unit Testing using JEST
- Error handling middleware
- API request sanitation and validation
- CI/CD pipeline using GitHub Actions

## Database Schema

### Recipe
- Name - String
- Category - String
- Area - String
- Instructions - String
- Ingredients - [{ Name: String, Measure: String }]
- ThumbImageURL - String
- Tags - [String]
- SourceURL - String
- DateAdded - Date
- User - ObjectID
- Comments - [{ CommentText: String, User: ObjectID, DateAdded: Date }]
- UpvoteCount - Number
- Summary - String
- PrepTime - Number
- CookTime - Number
- Servings - Number

### User
- Username - String
- PasswordHash - String
- Email - String
- SubmittedRecipes: [ObjectID]
- SavedRecipes: [ObjectID]
- JoinDate: Date
- AvatarImageURL - String

## API end points

### login
- POST "/" --> 
Logs in user if password matches saved password hash

### recipes
- GET "/" -->
Searches database for recipes based on request query object variable.

- GET "/:id" -->
Searches database for recipe that matches specific id.

- GET "/data" -->
Retrieves distinct categories, tags, and areas in database.

- DELETE "/:id" -->
Deletes recipe that matches specific id.

- POST "/" -->
Creates a new recipe.

- PUT "/:id" --> 
Updates a recipe that exists in the database.

- POST "/:id/upvotes" --> 
Updates the amount of upvotes a recipe has. Users can only modify upvotes +- 1.

- POST "/:id/comments" -->
Adds a comment to the specific recipe.

### users

- GET "/" -->
Returns all users in the database.

- GET "/:id" -->
Returns a specific user by ID.

- POST "/" -->
Creates a new user.

- PUT "/:id" -->
Updates a user's information.

- POST "/:id/savedRecipes" -->
Adds a recipe to the user's saved recipes.

- DELETE "/:id" -->
Removes a user with the specific ID, as well as all of their submitted recipes, from the database.


## Road Map
I still plan on implementing the following features:

- Front-end integration testing using Cypress
- Install rate-limiter-flexible package to prevent DDOS
- Add contact page
- Add pagination to user's submitted recipes
- Set up image store for recipe images in AWS S3
- Set up reverse proxy using NGINX
- Add filter for user submitted recipe images
- Add 404 page
