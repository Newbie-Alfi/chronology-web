import { useEffect, useState } from "react";
import { IChronology } from "../../API/models";
import { ProjectCard } from "../../components/ProjectCard";
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { v1 } from "../../API/v1";

interface IProjectsProps {}

export default () => {
  const [chronology, setChronology] = useState<IChronology[]>();

  const getChronologies = async () => {
    const response = await v1.chronology.get();

    setChronology(response?.data.results);
  };

  useEffect(() => {
    getChronologies();
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
          Последнее
        </Typography>
        <Grid container spacing={2}>
          {chronology?.map((chr) => (
            <Grid item key={chr.id}>
              <ProjectCard
                id={chr.id}
                width={240}
                name={chr.name}
                date={chr.creation_date}
                imgSrc={chr.img}
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          Все хронологии
        </Typography>
        <Grid container spacing={2}>
          {chronology?.map((chr) => (
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
      </Container>
    </>
  );
};
