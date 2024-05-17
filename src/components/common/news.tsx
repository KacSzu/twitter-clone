"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState<number>(3);
  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);
  return (
    <div className="text-muted-foreground space-y-3 bg-muted border  rounded-xl pt-2 p-4">
      <h1 className="font-bold text-foreground text-2xl ">Daily news</h1>
      <div className="divide divide-y divide-muted-foreground ">
        {news
          .slice(0, articleNum)
          .map(
            ({ title, description, url, source: { name }, urlToImage }, i) => (
              <div key={i} className="py-2">
                <Link href={url} target="_blank">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <h2 className="font-semibold text-sm">{title}</h2>
                      <p className="text-xs pb-1">By: {name}</p>
                    </div>
                    <img width={70} src={urlToImage} className="rounded-xl" />
                  </div>
                </Link>
              </div>
            )
          )}
      </div>
      <button
        className="text-sm pl-2 py-1 text-white hover:text-muted-foreground "
        onClick={() => setArticleNum(articleNum + 3)}
      >
        Show more...
      </button>
    </div>
  );
};

export default News;
