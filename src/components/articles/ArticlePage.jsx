import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticleVotes } from "../../utils/api.js";
import Error from "../Error";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TopicIcon from "@mui/icons-material/Topic";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { motion } from "framer-motion";
import ArticleComments from "./comments/ArticleComments.jsx";
import PopUpMessage from "../layout/PopUpMessage.jsx";
import UserContext from "../../context/usercontext.js";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { article_id } = useParams();
  const [votes, setVotes] = useState(0);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [failure, setFailure] = useState(false);
  const { loginUser } = useContext(UserContext);

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

  const updateVotes = (inc_votes) => {
    if (loginUser) {
      setVotes(votes + inc_votes);
      patchArticleVotes(article_id, inc_votes)
        .then((article) => {
          setVotes(0);
          setSuccess(true);
          if (inc_votes > 0) {
            setMessage("You Upvoted the Article! 👍");
          } else {
            setMessage("You Downvoted the Article! 👎");
          }
          setArticleInfo(article);
        })
        .catch((err) => {
          setVotes(0);
          setFailure(true);
          setMessage("Something went wrong");
        });
      setSuccess(false);
      setFailure(false);
    } else {
      setFailure(true);
      setMessage("Please login to Vote");
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }
  };

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
                onClick={() => {
                  updateVotes(1);
                }}
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
                onClick={() => {
                  updateVotes(-1);
                }}
              >
                <ThumbDownIcon sx={{ paddingRight: 1 }} /> Dislike
              </Button>
            </CardActions>
          </Card>
          {success && <PopUpMessage message={message} />}
          {failure && <PopUpMessage message={message} failure={failure} />}
          <ArticleComments />
        </section>
      )}
    </>
  );
};

export default ArticlePage;
