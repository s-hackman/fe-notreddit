import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../../utils/api";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TopicIcon from "@mui/icons-material/Topic";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Error from "../Error";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((topic) => {
        setTopics(topic);
        setIsLoading(false);
      })
      .catch((err) => setErr(err.message));
  }, []);

  return (
    <>
      {err && <Error />}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !err && (
        <Grid
          container
          spacing={2}
          sx={{
            px: 4,
            marginBottom: 1,
            height: "80vh",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mx: 3,
              marginTop: 4,
            }}
          >
            Choose a topic
          </Typography>
          {topics.map((topic, i) => (
            <Grid
              item
              xs={12}
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                my: 3,
                borderRadius: "5px",
              }}
              key={topic.slug}
              component={motion.div}
              initial={{
                opacity: 0,
                y: 50 + i * 100,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to={`/topics/${topic.slug}`}>
                <Grid
                  container
                  justifyContent="space-between"
                  justifyItems="center"
                >
                  <ListItemAvatar align="left">
                    <Avatar>
                      <TopicIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${topic.slug}`}
                    secondary={`${topic.description}`}
                  />
                </Grid>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Topics;
