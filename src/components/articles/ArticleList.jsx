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
import PopUpMessage from "../layout/PopUpMessage";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setSortOrder] = useState("desc");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [failure, setFailure] = useState(false);

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
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
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
                message={message}
                setMessage={setMessage}
                setFailure={setFailure}
                setSuccess={setSuccess}
              />
            ))}
          </Stack>
        </>
      )}
      {success && <PopUpMessage message={message} />}
      {failure && <PopUpMessage message={message} failure={failure} />}
    </>
  );
};
export default ArticleList;
