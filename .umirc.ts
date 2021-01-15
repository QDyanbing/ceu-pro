import path from 'path';
import { defineConfig } from 'umi';
import packageJSON from './package.json';
import { routers } from './src/pages/router';

export default defineConfig({
  antd: {},
  lessLoader: { javascriptEnabled: true },
  define: { VERSION: packageJSON.version },
  nodeModulesTransform: { type: 'none' },
  routes: routers,
  alias: {
    models: path.resolve(__dirname, './src/models'),
    pages: path.resolve(__dirname, './src/pages'),
    common: path.resolve(__dirname, './src/common'),
    assets: path.resolve(__dirname, './src/assets'),
    comp: path.resolve(__dirname, './src/components'),
    module: path.resolve(__dirname, './src/module'),
  },
  ignoreMomentLocale: true,
  hash: true,
});
