import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, noImageUrl, date, author, source} = this.props
    return (

      <div className="card">
        <div style={{display:'flex', justifyContent: "flex-end", position: "absolute", right: "0"}}>
          <span className="badge rounded-pill bg-danger" style={{left: "90%"}}>
            {source}
          </span>
        </div>
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