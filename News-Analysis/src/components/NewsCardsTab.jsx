/* eslint-disable react/prop-types */
// NewsCardTab.js
import { useState, useEffect, useRef } from "react";
import NewsCard from "./NewsCard";
import SampleImage from "../assets/images/sample.jpg";
import ClipLoader from "react-spinners/ClipLoader";
import NotFoundPage from "../pages/NotFoundPage";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Import left arrow icon

const NewsCardTab = ({ heading }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reference to the scroll container
  const scrollContainerRef = useRef(null);

  // Function to scroll the container to the right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  // Function to scroll the container to the left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    console.log("NewsCardTab component mounted");
    const fetchArticles = async () => {
      try {
        const response = await fetch(`/api/articles`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log data for debugging
        setArticles(data);
      } catch (error) {
        console.error("Fetch error:", error); // Log errors to the console
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
    <section className="py-4 relative">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold mb-4 ml-8 border-b-2 border-gray-300 pb-4">
          {heading}
        </h2>
        <div className="relative">
          <div
            className="flex overflow-x-auto scrollbar-hide space-x-4 p-4 rounded-lg"
            ref={scrollContainerRef}
          >
            {articles.map((article) => (
              <NewsCard
                key={article.id}
                image={article.urlToImage || SampleImage}
                title={article.title || "No Title Available"}
                description={article.description || "No Description Available"}
                link={`/articles/${article.id}`}
              />
            ))}
          </div>
          {/* Left Scroll Button */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md"
            onClick={scrollLeft}
          >
            <FaArrowLeft size={20} />
          </button>
          {/* Right Scroll Button */}
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md"
            onClick={scrollRight}
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsCardTab;
