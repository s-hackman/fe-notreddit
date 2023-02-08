import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticlesWithTopic } from "../../utils/api";
import Error from "../Error";
import ArticleListItem from "../articles/ArticleListItem";
import Stack from "@mui/system/Stack";
import SelectOptions from "../layout/SelectOptions";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TopicIcon from "@mui/icons-material/Topic";
import LoadingProgress from "../layout/LoadingProgress";

const TopicArticle = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setSortOrder] = useState("desc");
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticlesWithTopic(slug, order, sortBy)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => setErr(err.message));
  }, [slug, sortBy, order]);
  return (
    <>
      {err && <Error />}
      {isLoading && <LoadingProgress />}
      {!isLoading && !err && (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="static"
              sx={{ backgroundColor: "skyblue", marginBottom: 1 }}
            >
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, color: "black" }}
                >
                  <TopicIcon edge="start" />
                  {slug}
                </Typography>
                <SelectOptions
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setSortOrder={setSortOrder}
                  sx={{
                    backgroundColor: "red",
                  }}
                />
              </Toolbar>
            </AppBar>
          </Box>
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
        </>
      )}
    </>
  );
};

export default TopicArticle;
