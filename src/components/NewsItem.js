import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, noImageUrl, date, author, source} = this.props
    return (

      <div className="card">
        <span className="position-absolute top-0 left-90 z-1 translate-middle badge rounded-pill bg-danger" style={{left: "90%"}}>
          {source}
        </span>
        <img src={imageUrl?imageUrl:noImageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} at  {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel='noreferrer' target='_blank' className="btn btn-sm btn-outline-info">Read More</a>
        </div>
      </div>

    )
  }
}

export default NewsItem