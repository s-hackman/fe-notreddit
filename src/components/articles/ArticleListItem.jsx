import { Link } from "react-router-dom";
import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import TopicIcon from "@mui/icons-material/Topic";

const ArticleListItem = ({ article }) => {
  return (
    <Card
      sx={{ mx: 1 }}
      key={article.article_id}
      className="card"
      variant="outlined"
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
        <Button size="small">
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
