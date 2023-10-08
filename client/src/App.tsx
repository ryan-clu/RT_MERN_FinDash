import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme.ts';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from '@/scenes/navbar';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width='100%' height='100%' padding='1rem 2rem 4rem 2rem'>
            <Navbar />
            <Routes>
              <Route path='/' element={<div>dashboard page</div>} />
              <Route
                path='/predictions'
                element={<div>predictions page</div>}
              />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
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

- Box component from MUI lets me set CSS properties directly
onto the component. 
- MUI is a good alternative to Tailwind - MUI gives good functionality.
Tailwind excels in certain things, MUI is good if you have more
internal dashboards or internal apps, that require much more functionality
and less about custom styling and details. 

- rem = root em
based on default font size of the browser. Best way to set padding and sizes
unless absolute values are needed.
*/
