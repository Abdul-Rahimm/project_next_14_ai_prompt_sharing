"use client";
import { useEffect, useState } from "react";
import { fetchDrupalArticles } from "../../utils/drupal"; // Adjust the import path as necessary

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchDrupalArticles();
        setArticles(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticles();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (articles.length === 0) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="app">
      <h1 className="head_text">Articles</h1>
      <ul className="list-none p-0">
        {articles.map((article) => (
          <li key={article.id} className="prompt_card">
            <h2 className="text-xl font-bold mb-2">
              {article.attributes.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {article.attributes.body.summary}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: article.attributes.body.processed,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
