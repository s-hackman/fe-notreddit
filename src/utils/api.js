import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://shisho-news-api.onrender.com/api",
});

//Articles
export const getArticles = (order, sortBy) => {
  return baseApi
    .get("/articles", {
      params: { order, sort_by: sortBy },
    })
    .then((res) => {
      return res.data.articles;
    });
};

export const getArticleById = (article_id) => {
  return baseApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const patchArticleVotes = (article_id, inc_votes) => {
  return baseApi
    .patch(`/articles/${article_id} `, {
      inc_votes,
    })
    .then((res) => {
      return res.data.article;
    });
};

export const getArticlesWithTopic = (topic, order, sortBy) => {
  return baseApi
    .get("/articles", {
      params: { topic, order, sort_by: sortBy },
    })
    .then((res) => {
      return res.data.articles;
    });
};

export const postArticle = (author, title, body, topic, article_img_url) => {
  return baseApi
    .post("/articles", { author, title, body, topic, article_img_url })
    .then((res) => {
      return res.data.article;
    });
};

//Comments
export const getArticleComments = (article_id) => {
  return baseApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const postCommentByArticleId = (article_id, username, newComment) => {
  return baseApi
    .post(`/articles/${article_id}/comments`, { username, body: newComment })
    .then((res) => {
      return res.data["comment added"];
    });
};

export const deleteCommentById = (comment_id) => {
  return baseApi.delete(`/comments/${comment_id}`).then((res) => {
    return res.status;
  });
};

//Users
export const getUsers = () => {
  return baseApi.get("/users").then((res) => {
    return res.data.users;
  });
};

//Topic
export const getTopics = () => {
  return baseApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const postTopic = (slug, description) => {
  return baseApi.post("/topics", { slug, description }).then((res) => {
    return res.data.topic;
  });
};
