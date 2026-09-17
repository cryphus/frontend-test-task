import { existsSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin'

// При наличии artisan сборка идёт через laravel-vite-plugin, иначе — standalone SPA с mock API.
const isLaravel = existsSync(fileURLToPath(new URL('./artisan', import.meta.url)))

const vueOptions = {
  template: {
    transformAssetUrls: { base: null, includeAbsolute: false },
  },
}

export default defineConfig({
  plugins: isLaravel
    ? [laravel({ input: ['resources/css/app.css', 'resources/js/app.js'], refresh: true }), vue(vueOptions)]
    : [vue(vueOptions)],
  define: {
    __AVANTI_STANDALONE__: JSON.stringify(!isLaravel),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
    },
  },
})
