import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import fs from "fs";

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

export const Route = createFileRoute("/about")({
  component: () => <div>Hello /about!</div>,
  loader: () => loaderFn(),
});
