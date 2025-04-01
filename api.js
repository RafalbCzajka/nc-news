import axios from 'axios'

const api = axios.create({
    baseURL: "https://nc-news-w4kh.onrender.com/api",
});

const getTopics = () => {
    return api.get("/topics").then(({data}) => {
        return data.topics;
    })
}

const getArticles = () => {
    return api.get("/articles").then(({data}) => {
        return data.articles;
    })
}

export {getTopics, getArticles};