import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Project root directory
  build: {
    rollupOptions: {
      input: {
        main: './script/getPositions.ts', // Specify your file path
      },
    },
  },
});
