import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import configArcoStyleImportPlugin from './plugin/arcoStyleImport';
import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    configArcoStyleImportPlugin(),
    themePreprocessorPlugin({
      less: {
        // 此处配置自己的主题文件
        multipleScopeVars: [
          {
            scopeName: 'theme-default',
            path: resolve('src/theme/default.less'),
          },
          {
            scopeName: 'theme-green',
            path: resolve('src/theme/green.less'),
          },
        ],
        defaultScopeName: 'theme-default', // 默认取 multipleScopeVars[0].scopeName
        extract: false, // 在生产模式是否抽取独立的主题css文件
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js'],
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/assets/style/breakpoint.less')}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
