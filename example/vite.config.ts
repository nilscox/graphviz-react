import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'graphviz-react': path.resolve(__dirname, '../src/index.ts'),
    },
  },
});
