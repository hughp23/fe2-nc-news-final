import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";
import AddComment from "./AddComment";
import { Link } from "@reach/router";

class Article extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true
  };
  render() {
    console.log(this.props, "article props");
    const { article, isLoading } = this.state;
    if (isLoading) return <p>Page is Loading...</p>;
    return (
      <main className="main">
        <h1>Article</h1>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <p>Author: {article.created_by.username}</p>
        <p>Posted: {article.created_at.slice(0, 10)}</p>
        <p>Votes: {article.votes}</p>
        <button id={`${article._id}`} value="up" onClick={this.handleClick}>
          Vote up
        </button>
        <button id={`${article._id}`} value="down" onClick={this.handleClick}>
          Vote down
        </button>
        <Comments
          topic={article.belongs_to}
          user={this.props.user}
          id={article._id}
        />
      </main>
    );
  }

  componentDidMount() {
    console.log(this.props, "article props");
    const { id } = this.props;
    api.getArticleById(id).then(({ article }) => {
      console.log(article, "article");
      this.setState({ article, isLoading: false });
    });
  }

  handleClick = event => {
    const { id, value } = event.target;
    api.updateVote("articles", id, value).then(article => {
      this.setState({ article });
    });
  };
}

export default Article;
