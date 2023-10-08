import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});

/* Notes
- import path from 'path' 
use this to implement pathing option instead of regular relative/absolute pathing

- resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
  }
added so that when we use @ it will know what pathing we mean, replace current
directory name with src.
*/
