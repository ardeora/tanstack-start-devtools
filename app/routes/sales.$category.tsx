import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { invoice_list } from "../db";

export const loaderFn = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const list = invoice_list;

  return { list };
};

const toProperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
};

const getDaysFromToday = (date: string) => {
  const today = new Date();
  const due_date = new Date(date);
  const diff = due_date.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const Route = createFileRoute("/sales/$category")({
  component: SalesCategory,
  loader: () => loaderFn(),
});

function SalesCategory() {
  const { list } = Route.useLoaderData();
  const params = Route.useParams();

  return (
    <div className="mt-4">
      <h1 className="font-semibold text-xl text-neutral-600">
        {toProperCase(params.category || "")}
      </h1>

      <div className="border mt-2 h-[380px] flex rounded-md">
        <div className="flex-1 max-w-[50%] flex flex-col overflow-y-auto border-r">
          {list.map((item) => {
            const days = getDaysFromToday(item.due_date);
            const str =
              days == 0
                ? "DUE TODAY"
                : days < 0
                  ? "PAID"
                  : days == 1
                    ? "DUE TOMORROW"
                    : `IN ${days} DAYS`;
            return (
              <Link
                key={item.id}
                to="/sales/$category/$id"
                params={{ category: params.category, id: item.id }}
                preload="intent"
                className="border-b flex flex-col"
                activeProps={{
                  className: "bg-lime-100 text-lime-500 group selected",
                }}
              >
                <span className="w-full p-3 flex flex-col">
                  <span className="flex justify-between font-bold text-neutral-700 group-[.selected]:text-lime-700">
                    <span>{item.company}</span>
                    <span>{formatCurrency(item.amount)}</span>
                  </span>
                  <span className="flex justify-between text-neutral-500 text-sm group-[.selected]:text-lime-600">
                    <span>{new Date(item.due_date).getFullYear()}</span>
                    <span>{str}</span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
