import React, { useContext, useState } from "react";
import UserContext from "../../context/usercontext";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import LoginIcon from "@mui/icons-material/Login";
import { motion } from "framer-motion";
import PopUpMessage from "../layout/PopUpMessage";

const Users = () => {
  const { users, setLoginUser } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = (user) => {
    setSuccess(true);
    setMessage(`Succesfully logged in as ${user.username}`);
    setLoginUser(user);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        px: 4,
        marginBottom: 1,
        height: "80vh",
      }}
    >
      {users.map((user, time) => {
        return (
          <Grid
            item
            key={user.username}
            sx={{
              flexGrow: 1,
              my: 3,
              px: 3,
              borderRadius: "5px",
            }}
            component={motion.div}
            initial={{
              opacity: 0,
              y: 50 + time * 300,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileHover={{
              scale: 1.02,
            }}
          >
            <Card>
              <CardContent sx={{ backgroundColor: "#ffbca4" }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h3"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {user.username}
                  <Avatar
                    sx={{
                      paddingLeft: 3,
                    }}
                    alt={user.username}
                    src={user.avatar_url}
                  />
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleClick(user)}
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  endIcon={<LoginIcon />}
                >
                  Login as {user.username}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
      {success && <PopUpMessage message={message} />}
    </Grid>
  );
};

export default Users;
