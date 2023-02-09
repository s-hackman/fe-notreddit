import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticlesWithTopic } from "../../utils/api";
import Error from "../Error";
import SelectOptions from "../layout/SelectOptions";
import ArticleListItem from "../articles/ArticleListItem";
import { Stack } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TopicIcon from "@mui/icons-material/Topic";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import errorImage from "../../assets/errorImage.png";
import { getTopics } from "../../utils/api";
import LoadingProgress from "../layout/LoadingProgress";

const TopicArticle = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setSortOrder] = useState("desc");
  const { slug } = useParams();
  const [slugExist, setSlugExist] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((topic) => {
        let tempSlugs = topic.map((topicSlug) => topicSlug.slug);
        setSlugExist(tempSlugs.includes(slug));
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [slug]);

  useEffect(() => {
    setIsLoading(true);
    getArticlesWithTopic(slug, order, sortBy)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [slug, sortBy, order]);

  return (
    <>
      {err && <Error />}
      {isLoading && <LoadingProgress />}
      {!isLoading && !err && (
        <div>
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
                  <TopicIcon edge="start" />
                  {slug}
                  {!slugExist && <> Topic not Found ❌</>}
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
          {!slugExist && (
            <Card
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
                m: 3,
                p: 3,
                borderRadius: 3,
              }}
            >
              <Typography variant="h3" component="div" sx={{ color: "black" }}>
                Sorry, there aren't any topics on notreddit with that name.
              </Typography>
              <Typography variant="h6" sx={{ color: "grey" }}>
                This topic may have been banned or the topic name is incorrect.
              </Typography>
              <CardMedia
                sx={{
                  maxWidth: "50vw",
                }}
                component="img"
                image={errorImage}
                alt="error"
              />
            </Card>
          )}
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
