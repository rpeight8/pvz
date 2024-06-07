import { defineConfig } from 'vite';
import path from 'path';

const __dirname = path.dirname('.');

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@features': path.resolve(__dirname, './src/features'),
    },
  },
});
