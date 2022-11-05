export type ThemeInitialState = {
  theme: Theme;
  changeTheme: (selectedTheme: string) => void;
};

export type Theme = {
  backgroundColor: string;
  color: string;
  primaryBoxShadow: string;
  transition: string;
  barBackground: string;
};
