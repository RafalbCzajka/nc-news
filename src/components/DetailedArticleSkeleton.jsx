import React from "react";

export default function DetailedArticleCard() {
    const bodyLines = Math.floor(Math.random() * 4) + 3;

    return (
        <section className="detailed-article-card">
            <div className="skeleton skeleton-title" style={{width: "70%", height: "2rem", margin: "1rem auto"}}></div>
            <div className="skeleton skeleton-author" style={{width: "20%", height: "1rem", margin: "0.5rem 0"}}></div>
            <div className="skeleton skeleton-topic" style={{width: "21%", height: "1rem", margin: "0.5rem 0"}}></div>
            <div className="skeleton skeleton-date" style={{width: "19%", height: "1rem", margin: "0.5rem 0 1rem 0"}}></div>
            <div className="skeleton skeleton-image" style={{width: "100%", height: "450px", marginBottom: "1rem"}}></div>

            {Array(bodyLines).fill(0).map((_, i) => (
                <div key={i} className="skeleton skeleton-text" style={{width: `${90 - i * 5}%`, height: "1rem", margin: "0.5rem 0"}}></div>
            ))}

            <div className="skeleton skeleton-votes" style={{width: "15%", height: "3rem", marginTop: "1rem", marginLeft: "auto"}}></div>
        </section>
    )
}