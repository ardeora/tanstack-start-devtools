import type { Plugin } from "vite";
import { messageBroker } from "./message-broker";
import fs from "fs";

let count = 1;

const clientPlugin: Plugin = {
  name: "devtools-client-plugins",
  enforce: "pre",
  configureServer(server) {
    const _server = server;
    // messageBroker.subscribe("devtools:test", (a) => {
    //   _server.ws.send("devtools:message", a);
    // });

    setInterval(() => {
      _server.ws.send("devtools:message", "" + count);
    }, 3000);
  },
};

const ssrPlugin: Plugin = {
  name: "devtools-ssr-plugins",
  enforce: "pre",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      console.log("middleware", req.url);
      if (req.url?.includes("tanstack_start_devtools")) {
        console.log("tanstack_start_devtools RQUESTED");
        count++;
      }
      next();
    });
  },
  transform(code, id, options) {},
};

export { clientPlugin, ssrPlugin };
