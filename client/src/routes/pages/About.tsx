import {
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Box,
} from "@mui/material";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../constants";
import { Map } from "../../components/common/Map";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { AboutMap } from "../../components/AboutMap/AboutMap";
import { USER_DATA } from "../../API/v1/services/auth";
import { v1 } from "../../API/v1";

interface IAboutPageProps {}

export const AboutPage: FC<IAboutPageProps> = () => {
  const navigate = useNavigate();
  // TODO: вынести в отдельный стор это бред
  const [userData, setUserData] = useState(localStorage.getItem(USER_DATA));
  const goToProjects = () => navigate(PATH.PROJECTS);
  const goToSignIn = () => navigate(PATH.SIGN_IN);
  const goToSingUp = () => navigate(PATH.SIGN_UP);
  // TODO: бред
  const logout = () => {
    v1.auth.logout();
    setUserData(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Хронология
          </Typography>
          {userData ? (
            <Button color="inherit" onClick={logout}>
              Выход
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={goToSignIn}>
                Вход
              </Button>
              <Button color="inherit" onClick={goToSingUp}>
                Регистрация
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Grid item xs={12} md={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={PATH.PROJECTS}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Построить карту
              </Typography>
            </Link>
            {/* <Button
              variant="contained"
              sx={{ height: 40 }}
              onClick={goToProjects}
            >
              Построить хронологию
            </Button> */}
          </Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Создайте постройте или возьмите карту о любом событии и измените её
            под себя. Добавьте свои регионы и отобразите данные о них в
            хронологической последовательности
          </Typography>
        </Grid>
        <Map
          CSSStyle={{ width: "100%", height: "40vh" }}
          style="mapbox://styles/mapbox/dark-v11"
        >
          <AboutMap />
        </Map>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={12}>
            {/* <Grid item xs={12} md={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Создайте тематическую карту
                </Typography>
                <Button
                  variant="contained"
                  sx={{ height: 40 }}
                  onClick={goToProjects}
                >
                  Построить хронологию
                </Button>
              </Box>
            </Grid> */}
            {/* <Grid item xs={2} md={2}>

            </Grid> */}
            <Grid item xs={12} md={12}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Возможности
              </Typography>
              <Timeline
                position="alternate"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
              >
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    Выберите карту или позаимствуйте её у сообщества
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    Добавьте события, нарисуйте регионы и напишите о них
                    что-нибудь
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    Перейдите в режим просмотра вашей карты
                  </TimelineContent>
                </TimelineItem>
                {/* <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                  </TimelineSeparator>
                  <TimelineContent>Repeat</TimelineContent>
                </TimelineItem> */}
              </Timeline>
              {/* <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Просто постройте или скопируйте карту о любом событии и измените
                её под себя. Добавьте свои регионы и отобразите данные в них в
                хронологической последовательности
              </Typography> */}
            </Grid>
          </Grid>
          {/* <Grid item md={2} sx={{ mt: 1 }}></Grid> */}
        </Grid>
      </Container>
    </>
  );
};
