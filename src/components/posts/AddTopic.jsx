import React, { useState, useContext } from "react";
import { postTopic } from "../../utils/api";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PublishIcon from "@mui/icons-material/Publish";
import CardActions from "@mui/material/CardActions";
import UserContext from "../../context/usercontext";
import PopUpMessage from "../layout/PopUpMessage";
import Error from "../Error";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddTopic = () => {
  const [err, setErr] = useState(null);
  const [slug, setSlug] = useState("");
  const [description, setDescripton] = useState("");
  const { loginUser } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [failure, setFailure] = useState(false);

  const handleSubmitTopic = (e) => {
    e.preventDefault();
    if (loginUser && slug && description) {
      postTopic(slug, description)
        .then((res) => {
          setSuccess(true);
          setMessage(`You posted a Topic called ${res.slug}`);
          setSlug("");
          setDescripton("");
        })
        .catch((err) => {
          setErr(err);
          setFailure(true);
          setMessage(`${err.response.data.message}`);
        });
      setSuccess(false);
      setFailure(false);
    } else if (!slug || !description) {
      setFailure(true);
      setMessage("You are missing a required field");
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    } else {
      setFailure(true);
      setMessage("Please login to Post A new Topic");
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
          <h1>Post A New Topic</h1>
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
              id="slug"
              type="text"
              value={slug}
              name="slug"
              onChange={(e) => {
                setSlug(e.target.value);
              }}
              label="Topic"
              fullWidth
              sx={{ my: 1 }}
            />
            <TextField
              id="description"
              type="text"
              name="description"
              value={description}
              onChange={(e) => {
                setDescripton(e.target.value);
              }}
              label="Description"
              fullWidth
              sx={{ my: 1 }}
            />
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
              onClick={handleSubmitTopic}
            >
              Post Topic
            </Button>
          </CardActions>
        </Item>
        {success && <PopUpMessage message={message} />}
        {failure && <PopUpMessage message={message} failure={failure} />}
      </Card>
    </>
  );
};

export default AddTopic;
