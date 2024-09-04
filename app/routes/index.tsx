// app/routes/index.tsx
import * as fs from "fs";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

const filePath = "count.txt";

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0")
  );
}

const getCount = createServerFn("GET", () => {
  return readCount();
});

const updateCount = createServerFn("POST", async (addBy: number) => {
  const count = await readCount();
  await fs.promises.writeFile(filePath, `${count + addBy}`);
});

const loaderFn = async () => {
  console.log("loader started");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("loader ended");
  return getCount();
};

export const Route = createFileRoute("/")({
  component: Home,
  loader: (a) => {
    return loaderFn();
  },
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div>
      <button
        onClick={() => {
          updateCount(1).then(() => {
            router.invalidate();
          });
        }}
      >
        Add 1 to {state}?
      </button>
      Hello
      <Link to="/about">Hello</Link>
    </div>
  );
}
