/* eslint-disable react/prop-types */
// NewsCard.js
import NewsCard from "./NewsCard";
import SampleImage from "../assets/images/sample.jpg";

const NewsCardTab = ({ heading }) => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold mb-4 ml-8 border-b-2 border-gray-300 pb-4">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 rounded-lg">
          <NewsCard
            image={SampleImage}
            title="For Developers"
            description="Browse our React jobs and start your career today"
            link="/jobs"
          />
          <NewsCard
            image={SampleImage}
            title="For Employers"
            description="List your job to find the perfect developer for the role"
            link="/add-job"
          />
          <NewsCard
            image={SampleImage}
            title="Sample Card"
            description="This is a sample card description."
            link="/sample"
          />
          <NewsCard
            image={SampleImage}
            title="Another Card"
            description="Another sample card description."
            link="/another"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsCardTab;
