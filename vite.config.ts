import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'
import path from 'path'

const production = process.env.NODE_ENV === 'production'
// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [
    svelte({
      emitCss: production,
      preprocess: sveltePreprocess(),
      compilerOptions: {
        dev: !production,
      },
    }),
  ],
  server: {
    host: 'localhost',
    port: 5000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
})

export default config
