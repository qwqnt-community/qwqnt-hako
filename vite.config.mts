import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { builtinModules } from 'node:module';
import viteCp from 'vite-plugin-cp';
import viteOxlint from 'unplugin-oxlint/vite';
import viteZipPack from 'unplugin-zip-pack/vite';
import Plugin from './package.json' with { type: 'json' };

const SRC_DIR = resolve(import.meta.dirname, './src');
const OUTPUT_DIR = resolve(import.meta.dirname, './dist');

const external = ['electron', ...builtinModules.flatMap(m => [m, `node:${m}`])];

const BaseConfig = defineConfig({
  root: import.meta.dirname,
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
  },
});

const configs = {
  main: defineConfig({
    ...BaseConfig,

    plugins: [
      viteOxlint({
        includes: 'src',
        glob: true,
        fix: true,
      }),
    ],
    build: {
      minify: true,
      outDir: resolve(OUTPUT_DIR, './main'),
      lib: {
        entry: resolve(SRC_DIR, './main/index.ts'),
        formats: [ 'cjs' ],

        fileName: () => 'index.js',
      },
      rolldownOptions: {
        external,
      },
      target: 'node23',
    },
    oxc: {
      target: 'node23',
    },
  }),
  preload: defineConfig({
    ...BaseConfig,

    plugins: [
      viteOxlint({
        includes: 'src',
        glob: true,
        fix: true,
      }),
    ],
    build: {
      minify: true,
      outDir: resolve(OUTPUT_DIR, './preload'),
      lib: {
        entry: resolve(SRC_DIR, './preload/index.ts'),
        formats: [ 'cjs' ],

        fileName: () => 'index.js',
      },
      rolldownOptions: {
        external,
      },
    },
  }),
  renderer: defineConfig({
    ...BaseConfig,

    plugins: [
      viteOxlint({
        includes: 'src',
        glob: true,
        fix: true,
      }),
      viteCp({
        targets: [
          { src: './package.json', dest: 'dist' },
          { src: './src/settings/static/icon.svg', dest: 'dist/static' },
          { src: './src/pages/settings.html', dest: 'dist/pages' },
        ],
      }),
      viteZipPack({
        in: OUTPUT_DIR,
        out: resolve(import.meta.dirname, `./${Plugin.name}.zip`),
      }),
    ],
    build: {
      minify: true,
      outDir: resolve(OUTPUT_DIR, './renderer'),
      lib: {
        entry: resolve(SRC_DIR, './renderer/index.ts'),
        formats: [ 'cjs' ],
        fileName: () => 'index.js',
      },
      rolldownOptions: {
        external,
      },
    },
  }),
};

export default defineConfig(({ mode }) => configs[mode as keyof typeof configs]);