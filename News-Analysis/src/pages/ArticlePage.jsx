import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/articles/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!data) {
          throw new Error("Article not found");
        }
        setArticle(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} />
      </div>
    );
  if (error) return <NotFoundPage />;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {article && (
        <>
          {/* Header Section */}
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              {article.title}
            </h1>
            <div className="text-gray-600 mt-2">
              <p>{new Date(article.publishedAt).toDateString()}</p>
              <p>{article.author}</p>
              <p>Business reporter</p>
            </div>
          </header>

          {/* Image Section */}
          <div className="mb-6">
            <img
              src={article.urlToImage}
              alt="Article"
              className="w-full h-auto"
            />
            <p className="text-gray-500 text-center mt-2">
              {article.description}
            </p>
          </div>

          {/* Article Content Section */}
          <article className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-none">
            <p>{article.content}</p>
          </article>
        </>
      )}
    </div>
  );
};

export default ArticlePage;
