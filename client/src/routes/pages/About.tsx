import {
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Box,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../constants";
import preview from "../../assets/images/preview.png";

interface IAboutPageProps {}

export const AboutPage: FC<IAboutPageProps> = () => {
  const navigate = useNavigate();

  const goToProjects = () => navigate(PATH.PROJECTS);
  const goToSignIn = () => navigate(PATH.SIGN_IN);
  const goToSingUp = () => navigate(PATH.SIGN_UP);

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Хронология
          </Typography>
          <Button color="inherit" onClick={goToSignIn}>
            Вход
          </Button>
          <Button color="inherit" onClick={goToSingUp}>
            Регистрация
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid item xs={10} md={10}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Создайте тематическую карту
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Просто постройте или скопируйте карту о любом событии и измените
                её под себя. Добавьте свои регионы и отобразите данные в них в
                хронологической последовательности
              </Typography>
            </Grid>

            <Button variant="contained" onClick={goToProjects}>
              Построить хронологию
            </Button>
          </Grid>
          <Grid item md={6} sx={{ mt: 1 }}>
            <img width={"100%"} src={preview} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
