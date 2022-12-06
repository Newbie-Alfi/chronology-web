import { createContext, useContext } from "react";

export const newContext = <T>() => {
  const context = createContext<T | undefined>(undefined);

  const hook = () => {
    const value = useContext(context);

    if (!value) {
      throw new Error("Data inner context = undefined!!!");
    }

    return value;
  };
  return [context, hook] as const;
};
