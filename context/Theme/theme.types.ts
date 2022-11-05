export type ThemeInitialState = {
  theme: Theme;
  changeTheme: (selectedTheme: string) => void;
};

export type Theme = {
  backgroundColor: string;
  color: string;
  primaryboxShadow: string;
  transition: string;
  lightText: string;
};
