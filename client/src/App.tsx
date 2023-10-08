import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme.ts';
import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;

/* Notes
- Our custom theme settings that we generated in theme.ts
are brought in for use in the app.
- createTheme comes from MUI and we put in our themeSettings 
from theme.ts. useMemo [] makes it only load once at 
beginning of app.
- ThemeProvider gives us our theme.
- CssBaseline resets all CSS settings to default that MUI
has set - removes all defaults of styling on the browser.

*/
