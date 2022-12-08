import { CircularProgress } from "@mui/material";
import { CSSProperties, FC } from "react";

interface ILoaderProps {
  children?: React.ReactNode;
  style?: CSSProperties;
}

export const Loader: FC<ILoaderProps> = ({
  style,
  children = <CircularProgress />,
}) => (
  <div style={style} className="full-size center">
    {children}
  </div>
);
