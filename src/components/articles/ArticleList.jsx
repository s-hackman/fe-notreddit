import { useEffect, useState } from "react";
import { getArticles } from "../../utils/api";
import ArticleListItem from "./ArticleListItem";
import Error from "../Error";
import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArticleIcon from "@mui/icons-material/Article";
import SelectOptions from "../layout/SelectOptions";
import LoadingProgress from "../layout/LoadingProgress";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setSortOrder] = useState("desc");

  useEffect(() => {
    setIsLoading(true);
    getArticles(order, sortBy)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [sortBy, order]);
  return (
    <>
      {err && <Error />}
      {isLoading && <LoadingProgress />}
      {!isLoading && !err && (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="static"
              sx={{
                backgroundColor: "gold",
                marginBottom: 1,
              }}
            >
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, color: "black" }}
                >
                  <ArticleIcon edge="start" />
                  All Articles
                </Typography>
                <SelectOptions
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setSortOrder={setSortOrder}
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
export default ArticleList;
