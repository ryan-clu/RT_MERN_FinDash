// eslint-disable-next-line
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string;
  }

  interface Palette {
    tertiary: PaletteColor;
  }
}

/*
expanded-theme.ts was created after theme.ts to further
customize and extend/expand theme settings for MUI as
tertiary doesnt exist in Palette. Also need this in
conjunction for TS
*/ 