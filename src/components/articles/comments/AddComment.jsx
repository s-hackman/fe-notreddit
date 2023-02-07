import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { postCommentByArticleId } from "../../../utils/api";
import UserContext from "../../../context/usercontext";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import PopUpMessage from "../../layout/PopUpMessage";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddComment = ({ setArticleComments }) => {
  const [input, setInput] = useState("");
  const { article_id } = useParams();
  const { loginUser } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [failure, setFailure] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      setFailure(true);
      setMessage("Comment missing? 🤔");
      return;
    }
    postCommentByArticleId(article_id, loginUser.username, input)
      .then((commentRes) => {
        setArticleComments((currentComments) => {
          return [commentRes, ...currentComments];
        });
        setInput("");
        setSuccess(true);
        setMessage("Comment Posted 📮");
      })
      .catch((err) => {
        console.log(err);
        setFailure(true);
        setMessage("Something went wrong");
      });
    setSuccess(false);
    setFailure(false);
  };

  return (
    <Box
      noValidate
      component="form"
      autoComplete="off"
      sx={{
        backgroundColor: "primary.Light",
        "&:hover": {
          backgroundColor: "primary",
          opacity: [0.9, 0.8, 0.7],
        },
        mx: 3,
        my: 2,
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        id="Comment"
        label="Comment"
        placeholder="What are your thoughts?"
        multiline
        rows={4}
        fullWidth
        required={true}
        value={input}
        variant="filled"
        onChange={(e) => setInput(e.target.value)}
      />
      <Item>
        <Button
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Comment <SendIcon sx={{ paddingLeft: 1 }} />
        </Button>
      </Item>
      {success && <PopUpMessage message={message} />}
      {failure && <PopUpMessage message={message} failure={failure} />}
    </Box>
  );
};

export default AddComment;
