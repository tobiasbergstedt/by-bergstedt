import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import svgr from '@svgr/rollup';

const appPath = path.join(__dirname, '/src');

export default defineConfig(() => ({
  // root: appPath,
  publicDir: path.join(appPath, '/static'),
  envDir: path.join(__dirname, '/'),
  server: {
    open: true,
  },
  build: {
    emptyOutDir: true,
    outDir: path.join(__dirname, '/build'),
  },
  resolve: {
    alias: [
      { find: '@assets', replacement: path.join(appPath, '/assets') },
      { find: '@components', replacement: path.join(appPath, '/components') },
      { find: '@config', replacement: path.join(appPath, '/config') },
      { find: '@context', replacement: path.join(appPath, '/context') },
      { find: '@hooks', replacement: path.join(appPath, '/hooks') },
      { find: '@i18n', replacement: path.join(appPath, '/i18n') },
      { find: '@pages', replacement: path.join(appPath, '/pages') },
      { find: '@styles', replacement: path.join(appPath, '/styles') },
      { find: '@utils', replacement: path.join(appPath, '/utils') },
    ],
  },
  plugins: [react(),
    svgr()
  ],
}));
