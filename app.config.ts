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
    ssr: {
      vite: {
        // plugins: () => [
        //   {
        //     name: "my-plugin",
        //     transform(code, id: string) {
        //       // if (!id.includes("node_modules")) {
        //       //   fs.appendFileSync(
        //       //     "./hello.txt",
        //       //     `-- ${id} -- \n` + code + "\n"
        //       //   );
        //       // }
        //       // if (
        //       //   id ===
        //       //   "/Users/adeora/Workspace/start-app/app/routes/index.tsx?tsr-split"
        //       // ) {
        //       //   // Append some code to the end of the file
        //       //   fs.appendFileSync(
        //       //     "./hello.txt",
        //       //     `-- ${id} -- \n` + code + "\n"
        //       //   );
        //       // }
        //     },
        //     enforce: "pre",
        //   },
        // ],
      },
    },
  },
});

const myPlugin = {
  name: "my-plugin",
  transform(code, id: string) {
    if (id.includes("sales.tsx?tsr-split")) {
      return `
      import {
  createFileRoute,
  Link,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

const serverFn = createServerFn("GET", async (number: number) => {
  console.log("serverFn Started", number);
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("serverFn Ended", number);
  return {
    number,
  };
});

const loaderFn = async () => {
  const val = await serverFn(1234);
  const nav_items = [
    "Overview",
    "Subscriptions",
    "Invoices",
    "Customer",
    "Deposits",
  ];
  return { nav_items, number: val.number };
};

export const Route = createFileRoute("/sales")({
  component: Sales,
  loader: () => {
    console.log("loaderFn started");
    return loaderFn()
  }
});

function Sales({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { nav_items } = Route.useLoaderData();

  return (
    <div className="p-5 flex-1">
      <h1 className="font-bold text-3xl text-neutral-700">Sales</h1>

      <div className="flex gap-2 mt-3 text-neutral-500">
        {nav_items.map((item) => (
          <Link
            className="border px-3 py-1 rounded-md"
            activeProps={{
              className:
                "border px-3 py-1 rounded-md bg-lime-100 text-lime-700 border-lime-400",
            }}
            to="/sales/$category"
            params={{ category: item.toLowerCase() }}
            preload="intent"
            key={item}
          >
            {item}
          </Link>
        ))}
      </div>
      <Outlet />
      <button
        onClick={() => {
          router.invalidate();
        }}
      >
        Invalidate
      </button>
    </div>
  );
}

      `;
    }
    return code;
  },
  enforce: "pre",
};

// config.addRouter({});
const ssr_router = config.config.routers.filter((r) => r.name === "server")[0];
config.addRouter({
  name: "devtools-server",
  type: "http",
  base: "/__devtools__",
  handler: "./app/server/index.ts",
});
// ssr_router[0].plugins.unshift(Inspect());

async function addInspectPlugin() {
  const plugins_fn = await ssr_router.plugins;
  ssr_router.plugins = async () => {
    const plugins = await plugins_fn();
    return [
      // Inspect({
      //   open: true,
      //   build: true,
      //   outputDir: ".vite-inspect",
      // }),
      // myPlugin,
      ...plugins,
    ];
  };
}
addInspectPlugin();
export default config;
