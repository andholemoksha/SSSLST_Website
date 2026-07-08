import { createContext, useContext } from "react";

const NavThemeContext = createContext({ transparent: false });

export const NavThemeProvider = NavThemeContext.Provider;

/** Whether the navbar is currently overlaying a dark hero (transparent, white text). */
export function useNavTheme() {
  return useContext(NavThemeContext);
}
