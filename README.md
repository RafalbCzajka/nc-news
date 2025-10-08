# NC News

Welcome to **Nc News**, a Reddit-style news aggregation app where users may browse articles, view and post comments for specific articles, as well as having the ability to vote on articles.

This is the front-end for the project built with **React** and using a [custom **RESTful API**](https://github.com/RafalbCzajka/nc-news-API) for data.

## Live site
[View the deployed site here](https://rafalbczajka-nc-news-project.netlify.app/)

![Netlify Status](https://api.netlify.com/api/v1/badges/5cb05aef-1193-4569-8ade-d89525559f83/deploy-status)

It may take a minute to load initially as the API is hosted on render with a free plan.

## About the Project
NC News is a full-stack web application where users may:
- Browse a list of articles.
- Filter articles by topic.
- Sort articles by date, comment count, or vote count.
- View individual articles with their full content and comment threads.
- Vote on articles.
- Post and delete comments.
- Toggle the sitewide theme between light and dark. (By default uses system theme)
- Vote on comments.
- Post new articles to the site.
- Delete any article posted by the guest user.


This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

## Changes made after the bootcamp
The original front-end portion of this project was built over the span of a week, however after the bootcamp I returned to work on this project more to add more functionality and refine the visuals.

The changes made include:
- Implementation of the theme toggle functionality and addition of a light theme.
- Default theme set to system theme.
- Added user avatars to comment cards.
- Implemented voting on comments.
- Implemented the ability for users to post their own articles with a modal which is accessible anywhere on the site.
- Created a new guest account to prevent guest users from deleting any of the existing content.
- Implemented the delete article function which displays in the detailed article view on any article created by the guest user.
- Updated sidebar behaviour so that it closes automatically when any button on the sidebar is clicked.
- Implemented pagination to the all articles view with navigation controls at the bottom of the page.
- Implemented pagination to comments with infinite scroll so that new comments are loaded up to 10 at a time as the user scrolls down.
- Added a message that displays instead of comment cards if there are no comments.
- Implemented a major visual overhaul with new colour schemes, new fonts, loading animation replaced with loading skeletons, as well as other sitewide visual changes.
- Improved usability by adding a border around the toggle theme slider so that users know it is there.
- Added hover text and aria labels to the toggle theme and toggle sidebar buttons to improve accessibility.

## Technologies Used
- React
- Vite
- Axios

## Instructions for a local installation:
### Minimum Requirements:
- **Node.js** v23.3.0 or higher

### How to run locally:

1. Clone the repo:

```bash
git clone https://github.com/RafalbCzajka/nc-news.git
cd nc-news
```

2. Install dependencies

```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. The app should now be running at ``http://localhost:5173``