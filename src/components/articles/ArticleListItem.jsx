import { Link } from "react-router-dom";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ForumIcon from "@mui/icons-material/Forum";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import TopicIcon from "@mui/icons-material/Topic";
import { motion } from "framer-motion";

const ArticleListItem = ({ article, time }) => {
  return (
    <Card
      sx={{
        mx: 1,
        marginBottom: 1,
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
      }}
      key={article.article_id}
      className="card"
      variant="outlined"
      component={motion.div}
      initial={{
        opacity: 0,
        y: 50 + time * 200,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.02,
      }}
    >
      <CardContent key={article.article_id}>
        <Typography color="text.secondary">
          {`Posted by ${article.author} at ${new Date(
            article.created_at
          ).toGMTString()}`}
        </Typography>
        <Link to={`/articles/${article.article_id}`}>
          <Typography fontSize={{ fontSize: 20 }}>{article.title}</Typography>
        </Link>
        <Typography color="text.secondary">
          <TopicIcon />
          Topic: {article.topic}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography size="small">
          <ThumbsUpDownIcon sx={{ paddingRight: 1 }} />
          {article.votes} Upvotes
        </Typography>
        <Button
          size="small"
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link to={`/articles/${article.article_id}`}>
            <ForumIcon sx={{ paddingRight: 1 }} /> {article.comment_count}{" "}
            Comments
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};
export default ArticleListItem;
