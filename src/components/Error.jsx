import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import errorImage from "../assets/errorImage.png";
import ErrorIcon from "@mui/icons-material/Error";

const Error = () => {
  return (
    <Card className="error-container">
      <CardContent>
        <Typography gutterBottom variant="h2" component="h1">
          <ErrorIcon /> Page Not Found
        </Typography>
        <Typography variant="h4" component="h2" color="text.secondary">
          These are uncharted Waters.
        </Typography>
        <Typography fontSize={{ fontSize: 20 }}>
          Try Searching or go to <Link to={`/articles/`}>home page</Link>.
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ maxWidth: "65vw" }}
        component="img"
        image={errorImage}
        alt="error"
      />
    </Card>
  );
};
export default Error;
