import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../utils/api.js";
import Error from "../Error";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import TopicIcon from "@mui/icons-material/Topic";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { motion } from "framer-motion";
import ArticleComments from "./comments/ArticleComments.jsx";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticleInfo(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [article_id]);

  return (
    <>
      {err && <Error />}
      {isLoading && <p>Loading</p>}
      {!isLoading && !err && (
        <section className="article-container">
          <Card sx={{ mx: 1 }} className="card" variant="outlined">
            <CardContent key={articleInfo.article_id}>
              <Typography variant="h4">{articleInfo.title}</Typography>
              <Typography color="textSecondary">
                {`Posted by ${articleInfo.author} at ${new Date(
                  articleInfo.created_at
                ).toGMTString()}`}
              </Typography>
              <hr />
              <Box component="img" src={articleInfo.article_img_url} />
              <br />
              <Typography variant="p">{articleInfo.body}</Typography>
              <hr />
              <Grid container justifyContent="space-between">
                <Typography color="textSecondary">
                  <ThumbsUpDownIcon align="left" sx={{ paddingRight: 1 }} />
                  {articleInfo.votes} Upvotes
                </Typography>
                <Typography color="textSecondary">
                  <TopicIcon />
                  {`${articleInfo.topic}`}
                </Typography>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                size="small"
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ThumbUpIcon sx={{ paddingRight: 1 }} />
                Like
              </Button>
              <Button
                variant="outlined"
                size="small"
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ThumbDownIcon sx={{ paddingRight: 1 }} /> Dislike
              </Button>
            </CardActions>
          </Card>
          <ArticleComments />
        </section>
      )}
    </>
  );
};

export default ArticlePage;
