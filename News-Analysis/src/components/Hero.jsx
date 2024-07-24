import React from "react";

const articles = [
  {
    id: 1,
    title: "Netanyahu facing 'day of rage' in Washington, protesters say",
    description:
      "Israeli prime minister cited as 'number one enemy' by pro-Palestinian groups as he prepares for speech to Congress.",
    time: "21 hrs ago",
    category: "World",
    imageUrl: "path/to/your/image1.jpg",
    main: true,
  },
  {
    id: 2,
    title: "Netanyahu seeks to bolster US support with Congress speech",
    description:
      "The address comes as the relationship between Israeli leaders and leading US Democrats has grown tense.",
    time: "2 hrs ago",
    category: "World",
    imageUrl: "path/to/your/image2.jpg",
    main: true,
  },
  {
    id: 3,
    title: "Gaza release deal has to happen now, hostage's mother says",
    time: "15 hrs ago",
    category: "Middle East",
  },
  {
    id: 4,
    title: "Pilot only survivor of Nepal plane crash",
    time: "4 hrs ago",
    category: "Asia",
  },
  {
    id: 5,
    title: "Australian surfer's leg washes up after shark attack",
    time: "7 hrs ago",
    category: "Australia",
  },
  {
    id: 6,
    title:
      "Graphic footage shows US officers standing over body of Trump gunman",
    time: "5 hrs ago",
    category: "US & Canada",
  },
];

const Hero = () => {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles
              .filter((article) => article.main)
              .map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-bold">{article.title}</h2>
                    <p className="mt-2">{article.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>
                        {article.time} &bull; {article.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="space-y-8">
            {articles
              .filter((article) => !article.main)
              .map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <h2 className="text-xl font-semibold">{article.title}</h2>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>
                      {article.time} &bull; {article.category}
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
