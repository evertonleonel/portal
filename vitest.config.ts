import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './test/_setup/index.ts',
    environment: 'jsdom',
  },
  server: {
    port: 5000,
  },
  preview: {
    port: 5000,
  },
});
