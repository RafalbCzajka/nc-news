import { useEffect } from "react";
import { getAllArticles} from "../../api"
import useApiRequest from "../hooks/useApiRequest"
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import ArticleCardSkeleton from "./ArticleCardSkeleton";
import { useSearchParams, useNavigate } from "react-router";

export default function ArticleList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const topic = searchParams.get("topic");
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";
    const page = parseInt(searchParams.get("page") || 1);
    const limit = 21;

    const {data, isLoading, error} = useApiRequest(getAllArticles, {topic: topic, sort_by: sortBy, order: order, page, limit});

    const articles = data.articles || [];
    const totalCount = data.total_count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    useEffect(() => {
        if (!isLoading && articles?.length === 0) {
            navigate("/not-found");
        }
    }, [isLoading, articles, navigate])

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage);
        setSearchParams(newParams);
    }

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [page])

    return (
        <section id="article-list" style={{minHeight: "100vh", minWidth: "100vw", position: "relative"}}>
            {isLoading ? (
                <ul>
                    {[...Array(limit)].map((_, i) => (
                        <ArticleCardSkeleton key={i} />
                    ))}
                </ul>
            ) : (
                <>
                    {error && <p>{error.msg}</p>}
                    <ul>
                        {articles.map((article) => (
                            <ArticleCard key={article.article_id} article={article}/>
                        ))}
                    </ul>
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>Prev</button>
                                <span>
                                    Page {page} of {totalPages}
                                </span>
                                <button disabled={page >= totalPages} onClick={() => handlePageChange(page + 1)}>Next</button>
                            </div>
                        )}
                </>
            )}
        </section>
    )
}