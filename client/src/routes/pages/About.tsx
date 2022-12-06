import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IAboutPageProps {}

export const AboutPage: FC<IAboutPageProps> = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate("projects")}>Построить хронологию</Button>
    </>
  );
};
