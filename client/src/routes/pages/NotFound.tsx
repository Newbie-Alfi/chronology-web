import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { Link } from "react-router-dom";

const primary = purple[500];

export default () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">Данной страницы не существует</Typography>
      <Link to="/projects/">Выбрать хронологию</Link>
    </Box>
  );
};
