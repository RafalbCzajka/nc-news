import axios from 'axios'

const api = axios.create({
    baseURL: "https://nc-news-w4kh.onrender.com/api",
});

const getTopics = () => {
    return api.get("/topics").then(({data}) => {
        return data.topics;
    })
}

const getAllArticles = ({topic, sort_by, order}) => {
    const params = new URLSearchParams();

    if (topic) params.set("topic", topic);
    if (sort_by) params.set("sort_by", sort_by);
    if (order) params.set("order", order);

    const url = `/articles?${params.toString()}`;

    return api.get(url).then(({data}) => {
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

const updateVoteCount = (articleId, voteType) => {
    return api.patch(`/articles/${articleId}`, {inc_votes: voteType === 'up' ? 1 : -1,})
    .then(({data}) => {
        return data.article;
    })
}

const postComment = (articleId, commentBody, username) => {
    return api.post(`/articles/${articleId}/comments`, {
        username,
        body: commentBody,
    })
    .then(({data}) => {
        return data.comment;
    })
}

const deleteComment = (commentId) => {
    return api.delete(`/comments/${commentId}`).then(({data}) => {
        return data;
    })
}

export {getTopics, getAllArticles, getArticle, getComments, updateVoteCount, postComment, deleteComment};