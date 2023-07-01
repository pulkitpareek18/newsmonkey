import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: "in",
    category: "general"
  }
  
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }


  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1
    }
  }

  
  async updateNews(){
    this.setState({loading: true})
    let url = `https://corsproxy.io/?https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b16ea3f554b248ccbc272f984806f6a9&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({ totalArticles : parsedData.totalResults })
    this.setState({ articles : parsedData.articles })
    this.setState({totalPage : Math.ceil(this.state.totalArticles / this.props.pageSize)})
    this.setState({loading: false})
 }


  async componentDidMount() {
    this.updateNews()
    var navLinks = document.getElementsByClassName("nav-link");
    Array.from(navLinks).forEach(function(link) {
      link.classList.remove("active");
    });
    document.getElementById(this.props.elementId).classList.add("active")
  }

 

  handlePreviousClick = async () => {
    this.setState({ page: (this.state.page - 1) }, this.updateNews )
    //Passing the update news function as callback so that the function will run only after the state is changed. State changes are asynchronus so changes does not take effect immediately.
  }

  handleNextClick = async () => {
    this.setState({ page: (this.state.page + 1) }, this.updateNews )
    //Passing the update news function as callback so that the function will run only after the state is changed. State changes are asynchronus so changes does not take effect immediately.
  }


  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center m-4'>NewsMonkey - Top Headlines  {this.props.categoryName.length !== 0 ? "in " + this.props.categoryName : ""}</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">

          {!this.state.loading && this.state.articles.map((element) => {

            return <div key={element.url} className="col-md-4 my-2">
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} noImageUrl="https://www.thoughtco.com/thmb/8-ESkbj1uvljxXhh4G-1J8bpiLw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/politician-talking-into-reporters--microphones-168961271-59a09230af5d3a0011ef552d.jpg" date={element.publishedAt} author={element.author} source={element.source.name} />
            </div>

          })}



        </div>
        <div className="container d-flex justify-content-between">
          <button onClick={this.handlePreviousClick} disabled={this.state.page <= 1 ? true : false} className="btn btn-outline-primary">&larr; Previous</button>
          <button onClick={this.handleNextClick} disabled={this.state.page >= this.state.totalPage ? true : false} className="btn btn-outline-primary">Next &rarr;</button>
        </div>
      </div>
    )
  }
}


export default News