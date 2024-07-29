import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import NotFoundPage from "./NotFoundPage";

const ContinentNewsPage = () => {
  const { continent } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`/api/articles/continent/${continent}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [continent]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} />
      </div>
    );
  }

  if (error) {
    return <NotFoundPage />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{continent} News</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          {articles[0] && (
            <div className="mb-4">
              <img
                src={articles[0].urlToImage}
                alt={articles[0].title}
                className="w-full h-auto mb-2"
              />
              <h2 className="text-2xl font-bold">{articles[0].title}</h2>
              <p className="text-gray-600">{articles[0].description}</p>
              <p className="text-sm text-gray-500">
                {articles[0].publishedAt} • {articles[0].author}
              </p>
            </div>
          )}
        </div>
        <div>
          {articles[1] && (
            <div className="mb-4">
              <img
                src={articles[1].urlToImage}
                alt={articles[1].title}
                className="w-full h-auto mb-2"
              />
              <h2 className="text-xl font-bold">{articles[1].title}</h2>
              <p className="text-sm text-gray-500">
                {articles[1].publishedAt} • {articles[1].author}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {articles.slice(2).map((article, index) => (
          <div key={index} className="mb-4">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-auto mb-2"
            />
            <h2 className="text-lg font-bold">{article.title}</h2>
            <p className="text-sm text-gray-500">
              {article.publishedAt} • {article.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinentNewsPage;
