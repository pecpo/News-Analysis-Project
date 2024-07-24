import React, { useState } from 'react';
import data from '../assets/article.json'
import NewsCardsTab from "../components/NewsCardsTab";

const NewsPage = () => {
  return (
    <div className="max-w-4xl container-xl lg:container m-auto">
      <div className="mt-4 flex justify-center items-center">
        <h1 className="text-4xl font-bold">{data.title}</h1>
      </div>
      <div className='flex justify-center items-center mt-4'>
        <h2 className="text-2xl font-bold leading-[20px]">By - {data.creator}</h2>
      </div>
      <div className='flex justify-center items-center mt-4'>
        <h2 className="text-2xl font-bold leading-[20px]">Published on - {data.pubDate}</h2>
      </div>
      {data.image_url && <img src={data.image_url} alt="Image" className="mt-10 h=[496px] w-full object-cover md:h-auto" />}
      <p className="mt-10 text-lg">{data.content}</p>
      <a href={data.link} target="_blank" rel="noopener noreferrer" className="mt-15 text-3xl text-blue-500 hover:underline text-center"> Original Article</a>
      <div className='mt-8'>
        <NewsCardsTab heading={"Related News"} />
      </div>
    </div>
  );
};

export default NewsPage;
