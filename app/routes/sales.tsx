import {
  createFileRoute,
  Link,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

const serverFn = createServerFn("GET", async (number: number) => {
  // console.log("serverFn Started", number);
  await new Promise((resolve) => setTimeout(resolve, 500));
  // console.log("serverFn Ended", number);
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
  loader: () => loaderFn(),
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
