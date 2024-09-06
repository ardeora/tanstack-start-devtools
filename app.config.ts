// app.config.ts
import { defineConfig } from "@tanstack/start/config";
import Inspect from "vite-plugin-inspect";
import fs from "fs";
import { withDevtools } from "./app/devtools/config";

const config = withDevtools({});

// const myPlugin = {
//   name: "my-plugin",
//   configureServer(server) {
//     console.log("configureServer");
//   },
//   enforce: "pre",
// };

// // config.addRouter({});
// const ssr_router = config.config.routers.filter((r) => r.name === "client")[0];
// config.addRouter({
//   name: "devtools-server",
//   type: "http",
//   base: "/__devtools__",
//   handler: "./app/server/index.ts",
// });
// // ssr_router[0].plugins.unshift(Inspect());

// async function addInspectPlugin() {
//   const plugins_fn = await ssr_router.plugins;
//   ssr_router.plugins = async () => {
//     const plugins = await plugins_fn();
//     return [
//       // Inspect({
//       //   open: true,
//       //   build: true,
//       //   outputDir: ".vite-inspect",
//       // }),s
//       myPlugin,
//       ...plugins,
//     ];
//   };
// }
// addInspectPlugin();
export default config;
