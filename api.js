import axios from 'axios'

const api = axios.create({
    baseURL: "https://nc-news-w4kh.onrender.com/api",
});

const getTopics = () => {
    return api.get("/topics").then(({data}) => {
        return data.topics;
    })
}

const getAllArticles = ({topic, sort_by, order, page = 1, limit = 10}) => {
    const params = new URLSearchParams();

    if (topic) params.set("topic", topic);
    if (sort_by) params.set("sort_by", sort_by);
    if (order) params.set("order", order);
    if (page) params.set("p", page);
    if (limit) params.set("limit", limit);

    const url = `/articles?${params.toString()}`;

    return api.get(url).then(({data}) => {
        return {
            articles: data.articles,
            total_count: data.total_count
        }
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

const getUserByUsername = (username) => {
    return api.get(`/users/${username}`).then(({data}) => {
        return data.user;
    })
}

const updateCommentVote = (commentId, voteType) => {
    return api.patch(`/comments/${commentId}`, {inc_votes: voteType === 'up' ? 1 : -1})
    .then(({data}) => {
        return data.comment;
    })
}

const postArticle = (article) => {
    return api.post("/articles", article).then(({data}) => {
        return data.article;
    })
}

const deleteArticle = (articleId) => {
    return api.delete(`/articles/${articleId}`).then(({data}) => data);
};

export {getTopics, getAllArticles, getArticle, getComments, updateVoteCount, postComment, deleteComment, getUserByUsername, updateCommentVote, postArticle, deleteArticle};