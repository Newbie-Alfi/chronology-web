import { FC } from "react";
import { Chrono } from "react-chrono";
import { TimelineProps } from "react-chrono/dist/models/TimelineModel";

export interface ITimelineProps extends TimelineProps {}

export const Timeline: FC<ITimelineProps> = ({
  mode = "HORIZONTAL",
  cardLess = true,
  theme,
  ...props
}) => {
  return (
    <Chrono
      {...props}
      mode={mode}
      cardLess={cardLess}
      theme={{
        secondary: "transparent",
        cardBgColor: "#4a4a4a",
        cardForeColor: "white",
        titleColor: "transparent",
        titleColorActive: "#4a4a4a",
        ...theme,
      }}
    ></Chrono>
  );
};
