import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";

class Articles extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    console.log(articles);
    return (
      <div>
        <h2>Articles</h2>
        <ul>
          {articles.map(article => {
            return (
              <li key={`${article.title}`}>
                <h3>{article.title}</h3>
                {/* <p>{article.body}</p> */}
                <Link to={`/article/${article._id}`}>Read More...</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    console.log(this.props, "props");
    const { topic } = this.props;
    if (prevProps.topic !== topic) {
      api.getArticles(topic).then(({ articles }) => {
        this.setState({ articles });
        //   console.log(data);
      });
    }
  }
}

export default Articles;