import React, { useState, useEffect, useContext } from "react";
import { getTopics, postArticle } from "../../utils/api";
import UserContext from "../../context/usercontext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import PublishIcon from "@mui/icons-material/Publish";
import PopUpMessage from "../layout/PopUpMessage";
import Error from "../Error";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddArticle = () => {
  const [err, setErr] = useState(null);
  const [selectTopic, setSelectTopic] = useState("");
  const [topicArray, setTopicArray] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const { loginUser } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [failure, setFailure] = useState(false);

  useEffect(() => {
    getTopics()
      .then((topic) => {
        setTopicArray(topic);
      })
      .catch((err) => setErr(err));
  }, []);

  const handleSubmitArticle = (e) => {
    e.preventDefault();
    if (loginUser && title && body && imgUrl && selectTopic) {
      postArticle(loginUser.username, title, body, selectTopic, imgUrl)
        .then((res) => {
          setSuccess(true);
          setMessage(`You posted an Article called ${res.title}`);
          setTitle("");
          setBody("");
          setImgUrl("");
          setSelectTopic("");
        })
        .catch((err) => {
          setErr(err);
          setFailure(true);
          setMessage("Something went wrong");
        });
      setSuccess(false);
      setFailure(false);
    } else if (!title || !imgUrl || !body || !selectTopic) {
      setFailure(true);
      setMessage("You are missing a required field");
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    } else {
      setFailure(true);
      setMessage("Please login to Post A new Article");
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }
  };

  return (
    <>
      {err && <Error />}
      <Card
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
          m: 3,
          borderRadius: 3,
        }}
      >
        <Item>
          <h1>Post An Article</h1>
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
          >
            <TextField
              label="Title"
              id="title"
              type="text"
              value={title}
              fullWidth
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              sx={{ my: 1 }}
            />
            <TextField
              id="body"
              label="Description"
              type="text"
              fullWidth
              value={body}
              name="body"
              onChange={(e) => {
                setBody(e.target.value);
              }}
              sx={{ my: 1 }}
            />
            <TextField
              id="article_img_url"
              label="Article Image URL"
              type="text"
              value={imgUrl}
              name="article_img_url"
              onChange={(e) => {
                setImgUrl(e.target.value);
              }}
            />
            <FormControl sx={{ minWidth: 200, mx: 2 }}>
              <InputLabel id="topic">Choose a Topic</InputLabel>
              <Select
                name="topic"
                labelId="topic"
                value={selectTopic}
                id="topic"
                label="Choose a Topic"
                onChange={(e) => {
                  setSelectTopic(e.target.value);
                }}
              >
                {topicArray.map((topicName) => {
                  return (
                    <MenuItem key={topicName.slug} value={topicName.slug}>
                      {topicName.slug}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              endIcon={<PublishIcon />}
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSubmitArticle}
            >
              Post Article
            </Button>
          </CardActions>
        </Item>
        {success && <PopUpMessage message={message} />}
        {failure && <PopUpMessage message={message} failure={failure} />}
      </Card>
    </>
  );
};

export default AddArticle;
