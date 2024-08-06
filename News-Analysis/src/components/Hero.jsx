import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SampleImage from "../assets/images/sample.jpg";
import ClipLoader from "react-spinners/ClipLoader";
import NotFoundPage from "../pages/NotFoundPage";

const Hero = () => {
  const { continent } = useParams();
  const [articles, setArticles] = useState([]);
  const [articles2, setArticles2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Hero component mounted");
    const fetchArticles = async () => {
      try {
        const response = await fetch(`/api/articles`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log data for debugging
        const limited= data.slice(0, 2);
        const limited2= data.slice(2, 6);
        setArticles2(limited2);
        setArticles(limited);
      } catch (error) {
        console.error('Fetch error:', error); // Log errors to the console
        setError(error.message);
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
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles
              .map((article) => (
                <Link to={`/articles/${article.id}`} key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={SampleImage}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-bold">{article.title}</h2>
                    <p className="mt-2">{article.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>
                        {article.publishedAt} &bull; {article.continent}
                      </span>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
          </div>
          <div className="space-y-8">
            {articles2
              .map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <h2 className="text-xl font-semibold">{article.title}</h2>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>
                      {article.publishedAt} &bull; {article.continent}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
