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

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, []);
  return (
    <>
      {err && <Error />}
      {isLoading && <p>Loading</p>}
      {!isLoading && !err && (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "skyblue" }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, color: "black" }}
                >
                  <ArticleIcon edge="start" />
                  All Articles
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <Stack className="articles-container">
            {articles.map((article) => (
              <ArticleListItem
                key={article.article_id}
                article={article}
                setArticles={setArticles}
              />
            ))}
          </Stack>
        </>
      )}
    </>
  );
};
export default ArticleList;
