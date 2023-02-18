import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { motion } from "framer-motion";
import heroImage from "../assets/heroImage.jpeg";
import ArticleIcon from "@mui/icons-material/Article";
import TopicIcon from "@mui/icons-material/Topic";
import PeopleIcon from "@mui/icons-material/People";

const HomePage = () => {
  return (
    <Grid
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        my: 1,
        mx: 3,
        borderRadius: "5px",
        textAlign: "center",
      }}
      component={motion.div}
      initial={{
        opacity: 0,
        y: 50,
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
      <Typography
        variant="h3"
        sx={{
          mx: 3,
          marginTop: 4,
        }}
      >
        Welcome to <strong>notreddit</strong>
      </Typography>
      <Box component="img" src={heroImage} sx={{ width: "90vw" }}></Box>
      <Typography variant="h5">
        You can use the navigation bar to browse the <ArticleIcon />
        articles and <TopicIcon />
        topics
      </Typography>
      <Typography variant="h6">
        Make sure to Login at the <PeopleIcon />
        Users tab to be able to vote, comment and post new articles and topics
      </Typography>
    </Grid>
  );
};

export default HomePage;
