import {
  defineConfig,
  TanStackStartDefineConfigOptions,
} from "@tanstack/start/config";
import { clientPlugin, ssrPlugin } from "./plugin";
import { Plugin } from "vite";
import Inspect from "vite-plugin-inspect";

type App = ReturnType<typeof defineConfig>;
type VinxiRouter = App["config"]["routers"][0] & {
  plugins: () => Promise<Plugin[]>;
};

function withDevtools(config: TanStackStartDefineConfigOptions) {
  const startConfig = defineConfig(config);
  const ssr_router = startConfig.config.routers.find(
    (r) => r.name === "ssr"
  )! as VinxiRouter;

  const client_router = startConfig.config.routers.find(
    (r) => r.name === "client"
  )! as VinxiRouter;

  patchSSRRouter(ssr_router);
  patchClientRouter(client_router);

  return startConfig;
}

function patchSSRRouter(router: VinxiRouter) {
  const plugins_fn = router.plugins;
  router.plugins = async () => {
    const plugins = await plugins_fn();
    return [ssrPlugin, ...plugins];
  };
}

function patchClientRouter(router: VinxiRouter) {
  const plugins_fn = router.plugins;
  router.plugins = async () => {
    const plugins = await plugins_fn();
    return [clientPlugin, ...plugins];
  };
}

export { withDevtools };
