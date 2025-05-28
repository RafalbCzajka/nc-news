import {useState, useEffect} from "react";
import { postArticle, getTopics } from "../../api";
import useApiRequest from "../hooks/useApiRequest";
import { useLoggedInUser } from "../Contexts/LoggedInUserContext";

export default function PostArticleForm({onSuccess, onclose}) {
    const {loggedInUser} = useLoggedInUser();
    const {data: topics, isLoading, error: topicsError} = useApiRequest(getTopics);

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        topic: "",
        article_img_url: "",
    });

    const [formError, setFormError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((curr) => ({...curr, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(null);
        setIsSubmitting(true);

        const articleToPost = {
            author: loggedInUser,
            ...formData
        };
    
        postArticle(articleToPost).then((newArticle) => {
            onSuccess(newArticle);
            setIsSubmitting(false);
            onclose();
        }).catch((err) => {
            setFormError(err?.response?.data?.msg || "Something went wrong");
            setIsSubmitting(false);
        });
    }

    if (isLoading) return <p>Loading topics...</p>
    if (topicsError) return <p>Error Loading Topics: {topicsError.msg}</p>

    return (
        <form onSubmit={handleSubmit} className="post-article-form">
            {formError && <p>{formError}</p>}

            <label htmlFor="title">Title:</label>
            <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} required disabled={isSubmitting}/>

            <label htmlFor="body">Body: </label>
            <textarea id="body" name="body" value={formData.body} onChange={handleChange} required/>

            <label htmlFor="topic">Topic: </label>
            <select id="topic" name="topic" value={formData.topic} onChange={handleChange} required>
                    <option value="">Select a topic</option>
                    {topics.map((topic) => (
                        <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                    ))}
                    </select>

            <label htmlFor="article_img_url">Image URL (optional): </label>
            <input id="article_img_url" name="article_img_url" value={formData.article_img_url} onChange={handleChange} placeholder="https://..."/>

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Posting..." : "Post Article"}</button>
        </form>
    )

}