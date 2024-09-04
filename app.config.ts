// app.config.ts
import { defineConfig } from "@tanstack/start/config";
import Inspect from "vite-plugin-inspect";
import fs from "fs";
// export default defineConfig({
//   vite: {
//     plugins: () => {
//       return [
//         Inspect({
//           build: true,
//           outputDir: ".vite-inspect",
//           open: true,
//         }),
//         {
//           name: "my-plugin",
//           transform(code, id) {
//             if (
//               id ===
//               "/Users/adeora/Workspace/start-app/app/routes/index.tsx?tsr-split"
//             ) {
//               console.log("transform", id);
//               return `
//               const abcd = 1234;
//               console.log(abcd);
//               ${code}
//               `;
//             }
//           },
//           enforce: "pre",
//         },
//       ];
//     },
//   },
// });

const config = defineConfig({
  routers: {
    server: {
      vite: {
        plugins: () => [
          {
            name: "my-plugin",
            transform(code, id: string) {
              // fs.appendFileSync("./hello.txt", `-- ${id} -- \n` + code + "\n");
              // if (
              //   id ===
              //   "/Users/adeora/Workspace/start-app/app/routes/index.tsx?tsr-split"
              // ) {
              //   // Append some code to the end of the file
              //   fs.appendFileSync(
              //     "./hello.txt",
              //     `-- ${id} -- \n` + code + "\n"
              //   );
              // }
            },
            enforce: "pre",
          },
        ],
      },
    },
  },
  vite: {
    plugins: () => [],
  },
});
// config.addRouter({});
// console.log(config.config.routers);
export default config;
