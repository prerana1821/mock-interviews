import { createContext, useContext, useState } from "react";
import { Theme, ThemeInitialState } from "./theme.types";

export const ThemeContext = createContext<ThemeInitialState>(
  {} as ThemeInitialState
);

export const ThemeProvider = ({ children }) => {
  const lightTheme: Theme = {
    backgroundColor: "#FFFFFF",
    color: "#000",
    primaryBoxShadow: "0 0 10px 4px rgb(0 0 0 / 5%)",
    transition: "background-color 0.6s ease, color 0.6s ease, box-shadow 1s",
  };

  const darkTheme: Theme = {
    backgroundColor: "#1c1c21",
    color: "#99cde6",
    primaryBoxShadow:
      "9.91px 9.91px 16px #111313, -9.91px -9.91px 16px #1F2123",
    transition: "background-color 0.6s ease, color 0.6s ease, box-shadow 1s",
    lightText: "#fff",
  };

  // #99cde6
  // #1c1c21

  const [theme, setTheme] = useState<Theme>({} as Theme);

  const changeTheme = (selectedTheme: string) => {
    if (selectedTheme === "lightTheme") {
      return setTheme(darkTheme);
    } else if (selectedTheme === "darkTheme") {
      return setTheme(lightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext<ThemeInitialState>(ThemeContext);
};
