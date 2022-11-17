import { CSSProperties } from "react";

export type ThemeInitialState = {
  theme: Theme;
  changeTheme: (selectedTheme: string) => void;
};

export type Theme = {
  primaryBoxShadow: string;
  lightText?: string;
} & CSSProperties;
