import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../../context/usercontext.js";
import { useParams } from "react-router-dom";
import { getArticleComments, deleteCommentById } from "../../../utils/api.js";
import Error from "../../Error.jsx";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { styled } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { motion } from "framer-motion";
import AddComment from "./AddComment.jsx";
import PopUpMessage from "../../layout/PopUpMessage";
import DeleteIcon from "@mui/icons-material/Delete";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ArticleComments = () => {
  const [articleComments, setArticleComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { article_id } = useParams();
  const { loginUser } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [failure, setFailure] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticleComments(article_id)
      .then((comments) => {
        setArticleComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [article_id]);

  const handleDelete = (commentId) => {
    deleteCommentById(commentId)
      .then(() => {
        setArticleComments((currComments) => {
          const newComments = currComments.filter(
            (comment) => comment.comment_id !== commentId
          );
          return newComments;
        });
        setSuccess(true);
        setMessage("Comment Deleted 🗑️");
      })
      .catch((err) => {
        setFailure(true);
        setMessage("Something went wrong");
      });
    setSuccess(false);
    setFailure(false);
  };

  return (
    <>
      {err && <Error />}
      {isLoading && <p>Loading</p>}
      {!isLoading && !err && (
        <>
          {loginUser && <AddComment setArticleComments={setArticleComments} />}
          <section className="article-comments">
            {articleComments.map((comment) => {
              return (
                <Card
                  sx={{ mx: 1 }}
                  key={comment.comment_id}
                  className="card"
                  variant="outlined"
                >
                  <CardContent key={comment.comment_id}>
                    <Typography>{comment.body}</Typography>
                    <hr />
                    <Grid container spacing={3}>
                      <Grid item xs>
                        <Item>
                          <Typography color="textSecondary">
                            <ThumbsUpDownIcon sx={{ paddingRight: 1 }} />
                            {comment.votes} Upvotes
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs>
                        <Item>
                          <Button
                            variant="outlined"
                            size="small"
                            component={motion.button}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ThumbUpIcon />
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            component={motion.button}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ThumbDownIcon />
                          </Button>
                        </Item>
                      </Grid>
                      <Grid item xs={5}>
                        <Item>
                          <Typography
                            color="text.secondary"
                            sx={{ paddingLeft: 1 }}
                            align="center"
                          >
                            {`Posted by ${comment.author} at ${new Date(
                              comment.created_at
                            ).toGMTString()}`}
                          </Typography>
                        </Item>
                      </Grid>
                      {loginUser?.username === comment.author && (
                        <Grid item xs>
                          <Item>
                            <Button
                              endIcon={<DeleteIcon sx={{ color: "red" }} />}
                              onClick={() => handleDelete(comment.comment_id)}
                              component={motion.button}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              Delete
                            </Button>
                          </Item>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </section>
          {success && <PopUpMessage message={message} />}
          {failure && <PopUpMessage message={message} failure={failure} />}
        </>
      )}
    </>
  );
};

export default ArticleComments;
