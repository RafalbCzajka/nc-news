import {useState, useEffect} from "react";
import { postArticle, getTopics } from "../../api";
import Loading from "./Loading";
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

            <label>Title: <input type="text" name="title" value={formData.title} onChange={handleChange} required disabled={isSubmitting}/></label>

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Posting..." : "Post Article"}</button>
        </form>
    )

}