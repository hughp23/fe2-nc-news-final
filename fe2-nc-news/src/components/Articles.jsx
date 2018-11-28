import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
// import Article from "./Article";
import "../css/Articles.css";
import UpdateButton from "./UpdateButton";

class Articles extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    return (
      <main className="main">
        <Link to="/articles/new_article">Post New Article</Link>
        <ul>
          {articles.map((article, index) => {
            return (
              <li className="articleList" key={article._id}>
                <h3>{article.title}</h3>
                <p>Comments: {article.comment_count}</p>
                <p>Votes: {article.votes}</p>
                <div>
                  <button
                    name={index}
                    id={`${article._id}`}
                    value="up"
                    onClick={this.handleClick}
                  >
                    Vote up
                  </button>
                  <button
                    name={index}
                    id={`${article._id}`}
                    value="down"
                    onClick={this.handleClick}
                  >
                    Vote down
                  </button>
                </div>
                <Link
                  to={`/articles/article/${article._id}`}
                  params={{ user: this.props.user }}
                >
                  Read More...
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }

  componentDidMount() {
    const { topic } = this.props;
    api.getArticles(topic).then(({ articles }) => {
      console.log(articles, "articles");
      this.setState({ articles });
    });
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;
    // console.log(prevProps.topic);
    // console.log(topic, "topic");
    if (prevProps.topic !== topic) {
      api.getArticles(topic).then(({ articles }) => {
        console.log(articles, "articles");
        this.setState({ articles });
      });
    }
  }

  // vote = (id, value) => {
  //   api.updateVote("articles", id, value).then(article => {
  //     this.setState({ article });
  //   });
  // };

  handleClick = event => {
    const { id, value } = event.target;
    const { articles } = this.state;

    api.updateVote("articles", id, value).catch(err => console.log(err));
    const updatedArticles = articles.map(article => {
      if (article._id === id) {
        return { ...article, votes: article.votes + (value === "up" ? 1 : -1) };
      } else return article;
    });
    console.log(updatedArticles, "newArticles");
    this.setState({ articles: updatedArticles });

    // map over articles from state
    // if article id  === id : return { ... article: votes: }
    // this.setState({ articles: updatedArticles })
  };
}

export default Articles;
