import { FC } from "react";
import { Link } from "react-router-dom";
import {
  CardActions,
  IconButton,
  Typography,
  CardContent,
  CardMedia,
  Card,
  CardProps,
} from "@mui/material";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

interface IProjectCardProps extends Omit<CardProps, "id"> {
  // TODO:
  // | "sx"
  // sx?: Omit<Pick<CardProps, "sx">, "width">;
  width: number;
  id: number;
  name: string;
  date: Date;
  imgSrc: string;
}

export const ProjectCard: FC<IProjectCardProps> = ({
  width,
  name,
  sx,
  date,
  imgSrc,
  id,
  ...props
}) => {
  return (
    <Card {...props} sx={{ ...sx, border: "none", width: width }}>
      {/* <CardActionArea> */}
      <CardMedia
        component="img"
        height={width}
        image={imgSrc}
        alt={name}
      ></CardMedia>
      <CardContent sx={{ p: 1 }}>
        <Typography gutterBottom variant="h6" component="h6" sx={{ m: 0 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ p: 0 }}>
          {moment(date).format("DD.MM.yyyy")}
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions sx={{ p: 1 }}>
        <Link color="white" to={`./${id}/?mode=watch`}>
          <IconButton aria-label="Просмотр" size="small">
            <VisibilityIcon />
          </IconButton>
        </Link>
        <IconButton aria-label="Редактировать" size="small">
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
