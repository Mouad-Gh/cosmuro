import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ 
    react(),
    /*{
        name: "configure-response-headers",
        configureServer: (server) => {
          server.middlewares.use((_req, res, next) => {
            res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            res.setHeader("Access-Control-Allow-Origin", "*");
            next();
          });
        },
      },*/

],
  
     resolve: {
        alias: {
            process: "process/browser",
            stream: "stream-browserify",
            zlib: "browserify-zlib",
            util: "util",
        },
    },
    server: {
        port: 3000,
        /*cors:false,
        proxy: {
            "/api": {
              target: "http://localhost:4000",
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/api/, ""),
            },
          },*/
      },
    
})
