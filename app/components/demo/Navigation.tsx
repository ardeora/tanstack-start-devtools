import React from "react";
import { Route } from "../../routes/__root";
import { Link, useLocation, useMatches } from "@tanstack/react-router";
import {
  Accounts,
  Contacts,
  Dashboard,
  Expenses,
  Home,
  Reports,
  Sales,
  Settings,
} from "../devtools/icons";

const icons = {
  home: <Home />,
  dashboard: <Dashboard />,
  accounts: <Accounts />,
  sales: <Sales />,
  expenses: <Expenses />,
  contacts: <Contacts />,
  reports: <Reports />,
  settings: <Settings />,
} as const;

const Navigation = () => {
  const { nav_items } = Route.useLoaderData();
  const matches = useMatches();
  const location = useLocation();
  const rootLocation = location.pathname.split("/")[1] as keyof typeof icons;

  const activeLinkClass =
    "p-2 rounded-md font-medium flex gap-2 text-sm hover:bg-neutral-50 text-neutral-600 bg-neutral-100 text-neutral-900";

  return (
    <div className="w-72 bg-white border-r border-neutral-300 py-5 gap-4 flex flex-col ">
      <div>
        <img src="/logo.png" className="h-8 px-5" />
      </div>
      <div className="px-5">
        <form className="border border-neutral-300 px-2 rounded-md overflow-hidden flex gap-2">
          <div className="flex items-center text-neutral-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.667"
                d="M17.5 17.5l-2.917-2.917m2.084-5a7.083 7.083 0 11-14.167 0 7.083 7.083 0 0114.167 0z"
              ></path>
            </svg>
          </div>

          <input
            placeholder="Search"
            className="leading-[2rem] outline-none text-sm"
          ></input>
        </form>
      </div>
      <div className="flex flex-col gap-2 px-3">
        {nav_items.map((nav_item) => (
          <Link
            preload="intent"
            key={nav_item}
            className={
              nav_item.toLowerCase() == rootLocation
                ? activeLinkClass
                : "p-2 rounded-md font-medium flex gap-2 text-sm hover:bg-neutral-50 text-neutral-600"
            }
            to="/sales"
          >
            <span className="flex items-center gap-2 h-5 w-5">
              {icons[nav_item.toLowerCase() as keyof typeof icons]}
            </span>
            <span>{nav_item}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
