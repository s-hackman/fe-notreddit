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

//Comments
export const getArticleComments = (article_id) => {
  return baseApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};
