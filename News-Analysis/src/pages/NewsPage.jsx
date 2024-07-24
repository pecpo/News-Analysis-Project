import data from '/article.json'

const NewsPage = () => {
  return (
  <div>
    <h1 className="mx-40 text-4xl font-bold mb-6 text-center">{data.title}</h1>
    <h2 className="mx-40 text-2xl font-bold mb-6 text-center">By - {data.creator}</h2>
    <p className="mx-40 text-lg">{data.content}</p>
    <a href={data.link} target="_blank" rel="noopener noreferrer" className=" mx-40 text-blue-500 hover:underline"> Original Article</a>
  </div>
  );
};

export default NewsPage;
