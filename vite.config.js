import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(), 
//     vueJsx(),
//     createSvgIconsPlugin({
//       iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
//       symbolId: 'icon-[name]',
//       inject: 'body-last',
//       customDomId: 'sprite-basic',
//     })
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//       '@components': fileURLToPath(new URL('./src/views/components', import.meta.url)),
//       '@pages': fileURLToPath(new URL('./src/views/pages', import.meta.url)),
//       '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
//       '@scss': fileURLToPath(new URL('./src/assets/scss', import.meta.url)),
//     }
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `
//           @import "./src/assets/scss/helpers/mixins.scss";
//           @import "./src/assets/scss/helpers/variables.scss";
//         `
//       }
//     }
//   }
// });

import path from 'node:path'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const virtualFile = '@virtual-file'
const virtualId = '\0' + virtualFile
const nestedVirtualFile = '@nested-virtual-file'
const nestedVirtualId = '\0' + nestedVirtualFile

const base = '/test/'

// preserve this to test loading __filename & __dirname in ESM as Vite polyfills them.
// if Vite incorrectly load this file, node.js would error out.
globalThis.__vite_test_filename = __filename
globalThis.__vite_test_dirname = __dirname

export default defineConfig(({ command, ssrBuild }) => ({
  base,
  plugins: [
    vuePlugin(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]',
      inject: 'body-last',
      customDomId: 'sprite-basic',
    }),
    {
      name: 'virtual',
      resolveId(id) {
        if (id === '@foo') {
          return id
        }
      },
      load(id, options) {
        const ssrFromOptions = options?.ssr ?? false
        if (id === '@foo') {
          // Force a mismatch error if ssrBuild is different from ssrFromOptions
          return `export default { msg: '${
            command === 'build' && !!ssrBuild !== ssrFromOptions
              ? `defineConfig ssrBuild !== ssr from load options`
              : 'hi'
          }' }`
        }
      },
    },
    {
      name: 'virtual-module',
      resolveId(id) {
        if (id === virtualFile) {
          return virtualId
        } else if (id === nestedVirtualFile) {
          return nestedVirtualId
        }
      },
      load(id) {
        if (id === virtualId) {
          return `export { msg } from "@nested-virtual-file";`
        } else if (id === nestedVirtualId) {
          return `export const msg = "[success] from conventional virtual file"`
        }
      },
    },
    // Example of a plugin that injects a helper from a virtual module that can
    // be used in renderBuiltUrl
    (function () {
      const queryRE = /\?.*$/s
      const hashRE = /#.*$/s
      const cleanUrl = (url) => url.replace(hashRE, '').replace(queryRE, '')
      let config

      const virtualId = '\0virtual:ssr-vue-built-url'
      return {
        name: 'built-url',
        enforce: 'post',
        configResolved(_config) {
          config = _config
        },
        resolveId(id) {
          if (id === virtualId) {
            return id
          }
        },
        load(id) {
          if (id === virtualId) {
            return {
              code: `export const __ssr_vue_processAssetPath = (url) => '${base}' + url`,
              moduleSideEffects: 'no-treeshake',
            }
          }
        },
        transform(code, id) {
          const cleanId = cleanUrl(id)
          if (
            config.build.ssr &&
            (cleanId.endsWith('.js') || cleanId.endsWith('.vue')) &&
            !code.includes('__ssr_vue_processAssetPath')
          ) {
            return {
              code:
                `import { __ssr_vue_processAssetPath } from '${virtualId}';__ssr_vue_processAssetPath;` +
                code,
              sourcemap: null, // no sourcemap support to speed up CI
            }
          }
        },
      }
    })(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/views/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/views/pages', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@scss': fileURLToPath(new URL('./src/assets/scss', import.meta.url)),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/scss/helpers/mixins.scss";
          @import "./src/assets/scss/helpers/variables.scss";
        `
      }
    }
  },
  experimental: {
    renderBuiltUrl(filename, { hostType, type, ssr }) {
      if (ssr && type === 'asset' && hostType === 'js') {
        return {
          runtime: `__ssr_vue_processAssetPath(${JSON.stringify(filename)})`,
        }
      }
    },
  },
  build: {
    minify: false,
  },
  ssr: {
    noExternal: [
      // this package has uncompiled .vue files
      '@vitejs/test-example-external-component',
    ],
  },
  optimizeDeps: {
    exclude: ['@vitejs/test-example-external-component'],
  },
}))
