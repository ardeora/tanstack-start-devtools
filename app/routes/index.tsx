// app/routes/index.tsx
import * as fs from "fs";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const router = useRouter();

  return (
    <div>
      <div>Hello</div>
    </div>
  );
}
