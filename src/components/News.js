import React, { useState,useEffect} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
 
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState()
  const [totalResults, setTotalResults] = useState()

  const apiKey = process.env.REACT_APP_NEWS_API

  
  useEffect(() => {
      if (props.category !== "general") {
        document.title = "NewsMonkey - " + props.categoryName;
      } else {
        document.title = "NewsMonkey - Get your daily dose of News for Free!";
      }
      setPage(1) // Set page to 1 from undefined on Initial render, this will invoke the another useEffect which will work on page change and when page is not undefined.
      // Silenced the dependency warning as I only want to run this code on initial render.
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  const fetchMoreData = () => {
    setPage((previous)=>previous+1);
  };
  
  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
      const data = await fetch(url);
      const parsedData = await data.json();

      if(page===1){
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
      }else{
        setArticles(prevArticles => prevArticles.concat(parsedData.articles));
      }

    };
    // console.log(page)
    // console.log("totalpage",totalResults)
    if(page){
            fetchNews();
    }
    // Silenced the dependency warning as I only want to run this code on initial render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // Run fetchNews whenever page changes

    return (
      <>
        <h1 className="text-center m-4">NewsMonkey - Top {props.categoryName} Headlines</h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          style={{overflow: "hidden"}}
        >
          <div className="container">
            <div className="row">
              {
                articles.map((element, index) => (
                  <div key={index} className="col-md-4 my-2">
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      noImageUrl="https://www.thoughtco.com/thmb/8-ESkbj1uvljxXhh4G-1J8bpiLw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/politician-talking-into-reporters--microphones-168961271-59a09230af5d3a0011ef552d.jpg"
                      date={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }

News.defaultProps = {
  country: "in",
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
}

export default News;
