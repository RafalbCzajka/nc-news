const express = require("express");
const app = express();

const {getEndpoints} = require("./controllers/api.controller");
const {getAllTopics} = require("./controllers/topics.controller");
const {getAllUsers} = require("./controllers/users.controller");
const {getArticleById, getAllArticles, patchArticle} = require("./controllers/articles.controller");
const {getCommentsByArticleId, postComment, deleteComment} = require("./controllers/comments.controller");
const {invalidPathHandler, serverErrorHandler, customErrorHandler, psqlErrorHandler} = require("./controllers/errors.controller");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/users", getAllUsers);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postComment);

app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticle);

app.get("/api/articles", getAllArticles);

app.delete("/api/comments/:comment_id", deleteComment);

app.all('*', invalidPathHandler);

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use(serverErrorHandler);

module.exports = app;