import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { NavLink } from "react-router-dom";
import UserContext from "../context/usercontext";
import ArticleIcon from "@mui/icons-material/Article";
import TopicIcon from "@mui/icons-material/Topic";
import PeopleIcon from "@mui/icons-material/People";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function TemporaryDrawer() {
  const [state, setState] = useState({
    right: false,
  });
  const { loginUser } = useContext(UserContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="test" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {loginUser ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt="avatar"
                    src={loginUser?.avatar_url}
                    sx={{ border: "1px solid white" }}
                  />
                </StyledBadge>
              ) : (
                <Avatar
                  alt="avatar"
                  src={loginUser?.avatar_url}
                  sx={{ border: "1px solid white" }}
                />
              )}
            </ListItemIcon>
            {loginUser ? (
              `Welcome ${loginUser.username}`
            ) : (
              <NavLink to={`/Users`}>Login</NavLink>
            )}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["Articles", "Topics", "Users"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {[<ArticleIcon />, <TopicIcon />, <PeopleIcon />][index]}
              </ListItemIcon>
              <NavLink to={`/${text}`}>{text}</NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {loginUser && (
        <List>
          {["Posts"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <UploadFileIcon />
                </ListItemIcon>
                <NavLink to={`/${text}`}>{text}</NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
