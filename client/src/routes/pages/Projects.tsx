import { useEffect, useState } from "react";
import { IChronology } from "../../API/models";
import { ProjectCard } from "../../components/ProjectCard";
import { Grid, Typography, TextField, Paper } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import { PATH } from "../constants";
import {
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Box,
} from "@mui/material";
import { v1 } from "../../API/v1";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchedName, setSearchedName] = useState<string>();
  const [chronology, setChronology] = useState<IChronology[]>();
  const [publicChronologies, setPublicChronologies] = useState<IChronology[]>();
  const [open, setOpen] = useState(true);

  const toAbout = () => navigate(PATH.ABOUT);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const getChronologies = async () => {
    const response = await v1.chronology.getMyChorono();
    setChronology(response?.data.results);
  };

  const getPublicChronologies = async (name: string) => {
    const response = await v1.chronology.getPublicChronologies(name);

    setPublicChronologies(response?.data);
  };

  useEffect(() => {
    getChronologies();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding disabled>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Карты"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={toAbout}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"О приложении"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <TextField
            value={searchedName}
            id="chronoName"
            label="Поиск в сообществе"
            name="chronoName"
            variant="filled"
            autoFocus
            onChange={(event) => {
              const str = event.target.value;

              setSearchedName(str);
              getPublicChronologies(str);
            }}
          />
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        {/* <Container maxWidth="md"> */}
        <Typography variant="h4" sx={{ mb: 2 }}>
          Мои карты
        </Typography>
        {/* <Paper> */}
        <Grid container spacing={2}>
          {chronology?.map((chr) => (
            <Grid item key={chr.id}>
              <ProjectCard
                width={200}
                id={chr.id}
                name={chr.name}
                date={chr.creation_date}
                imgSrc={chr.img}
              />
            </Grid>
          ))}
        </Grid>
        {/* </Paper> */}
        {publicChronologies && searchedName && (
          <>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
              {publicChronologies.length > 0
                ? "Сообщество"
                : "Ничего не найденно"}
            </Typography>
            <Grid container spacing={2}>
              {publicChronologies?.map((chr) => (
                <Grid item key={chr.id}>
                  <ProjectCard
                    width={150}
                    id={chr.id}
                    name={chr.name}
                    date={chr.creation_date}
                    imgSrc={chr.img}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {/* </Container> */}
      </Main>
    </Box>
  );
};
