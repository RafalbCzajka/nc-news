import React from "react";

export default function ArticleCardSkeleton() {
    const lines = Math.floor(Math.random() *3) + 1;

    return (
        <li className="article-card">
            {Array(lines).fill(0).map((_, i) => (
                <div
                    key={i}
                    className={`skeleton skeleton-title ${lines > 1 && i === lines - 1 ? "short" : ""}`}
                    />
            ))}
            <div className="skeleton skeleton-author"></div>
            <div className="skeleton skeleton-image"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
        </li>
    )
}