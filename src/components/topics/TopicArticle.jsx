import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticlesWithTopic } from "../../utils/api";
import Error from "../Error";
import ArticleListItem from "../articles/ArticleListItem";
import Stack from "@mui/system/Stack";

const TopicArticle = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticlesWithTopic(slug)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => setErr(err.message));
  }, [slug]);
  return (
    <>
      {err && <Error />}
      {!isLoading && !err && (
        <div>
          <Stack className="articles-container" sx={{ px: 2 }}>
            {articles.map((article, time) => (
              <ArticleListItem
                key={article.article_id}
                article={article}
                setArticles={setArticles}
                time={time}
              />
            ))}
          </Stack>
        </div>
      )}
    </>
  );
};

export default TopicArticle;
