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


  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=65d3887e33de454c81ca60d10de6aed1&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({ totalArticles : parsedData.totalResults })
    this.setState({ articles : parsedData.articles })
    this.setState({totalPage : Math.ceil(this.state.totalArticles / this.props.pageSize)})
    this.setState({loading: false})
  }

  handlePreviousClick = async () => {
    this.setState({loading: true})
    this.setState({ page: (this.state.page - 1) }, async function(){ //Passing the main function as callback so that the function run after the state is changed. State changes are asynchronus so changes does not take effect immediately.
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=65d3887e33de454c81ca60d10de6aed1&page=${this.state.page}&pageSize=${this.props.pageSize}`
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({ articles: parsedData.articles });
      this.setState({loading: false})
    });
  }

  handleNextClick = async () => {
    this.setState({loading: true})
    this.setState({ page: (this.state.page + 1) }, async function(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=65d3887e33de454c81ca60d10de6aed1&page=${this.state.page}&pageSize=${this.props.pageSize}`
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({ articles: parsedData.articles });
      this.setState({loading: false})
    });
  }


  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center m-4'>NewsMonkey - Top Headlines  {this.props.categoryName.length !== 0 ? "in " + this.props.categoryName : ""}</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">

          {!this.state.loading && this.state.articles.map((element) => {

            return <div key={element.url} className="col-md-4 my-2">
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} noImageUrl="https://www.thoughtco.com/thmb/8-ESkbj1uvljxXhh4G-1J8bpiLw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/politician-talking-into-reporters--microphones-168961271-59a09230af5d3a0011ef552d.jpg" />
            </div>

          })}



        </div>
        <div className="container d-flex justify-content-between">
          <button onClick={this.handlePreviousClick} disabled={this.state.page <= 1 ? true : false} className="btn btn-secondary">&larr; Previous</button>
          <button onClick={this.handleNextClick} disabled={this.state.page >= this.state.totalPage ? true : false} className="btn btn-secondary">Next &rarr;</button>
        </div>
      </div>
    )
  }
}


export default News