import axios from 'axios'

const api = axios.create({
    baseURL: "https://nc-news-w4kh.onrender.com/api",
});

const getTopics = () => {
    return api.get("/topics").then(({data}) => {
        return data.topics;
    })
}

const getAllArticles = () => {
    return api.get("/articles").then(({data}) => {
        return data.articles;
    })
}

const getArticle = (articleId) => {
    return api.get(`/articles/${articleId}`).then(({data}) => {
        return data.article;
    })
}

const getComments = (articleId) => {
    return api.get(`/articles/${articleId}/comments`).then(({data}) => {
        return data.comments;
    })
}

export {getTopics, getAllArticles, getArticle, getComments};