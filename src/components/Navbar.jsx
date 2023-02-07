import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Typography, Avatar, Tooltip, Button } from "@mui/material";
import RedditIcon from "@mui/icons-material/Reddit";
import ArticleIcon from "@mui/icons-material/Article";
import TopicIcon from "@mui/icons-material/Topic";
import PeopleIcon from "@mui/icons-material/People";
import { motion, useAnimationControls } from "framer-motion";
import UserContext from "../context/usercontext";

const Navbar = () => {
  const { loginUser } = useContext(UserContext);
  const animation = useAnimationControls();

  async function sequence() {
    await animation.start({ rotate: 360 });
    await animation.start({ scale: 1.5 });
    await animation.start({ rotate: 180 });
    animation.start({ scale: 1 });
  }

  return (
    <Grid
      className="nav-container"
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        padding: 2,
        position: "sticky",
        top: 0,
        backgroundColor: "coral",
        zIndex: 1,
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
      }}
    >
      <Typography
        variant="h5"
        component={motion.h5}
        animate={{ x: [0, 5, 0], opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0.5, 0.71, 1, 1.5],
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <RedditIcon
          sx={{ paddingRight: 1, color: "white", cursor: "pointer" }}
          component={motion.svg}
          onTap={sequence}
          animate={animation}
        />
        <strong>notreddit</strong>
      </Typography>
      <Tooltip title="Articles" placement="top-start">
        <Button
          variant="outlined"
          startIcon={<ArticleIcon />}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <NavLink to="/articles">Articles</NavLink>
        </Button>
      </Tooltip>
      <Tooltip title="Topics" placement="top">
        <Button
          variant="outlined"
          startIcon={<TopicIcon />}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <NavLink to="/topics">Topics</NavLink>
        </Button>
      </Tooltip>
      <Tooltip title="Users" placement="top-end">
        <Button
          variant="outlined"
          startIcon={<PeopleIcon />}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <NavLink to="/users">Users</NavLink>
        </Button>
      </Tooltip>
      {loginUser && (
        <Typography variant="p">
          Welcome <strong>{loginUser.username}</strong>
        </Typography>
      )}

      <Avatar alt="avatar" src={loginUser?.avatar_url} />
    </Grid>
  );
};

export default Navbar;
