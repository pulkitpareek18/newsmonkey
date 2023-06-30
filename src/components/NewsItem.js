import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, noImageUrl} = this.props
    return (

      <div className="card">
        <img src={imageUrl?imageUrl:noImageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} rel='noreferrer' target='_blank' className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>

    )
  }
}

export default NewsItem