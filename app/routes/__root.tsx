// app/routes/__root.tsx
import { createRootRoute } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import "../index.css";
import Navigation from "../components/demo/Navigation";

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "TanStack Start Starter",
    },
  ],
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
  loader: async (args) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const nav_items = [
      "Home",
      "Dashboard",
      "Accounts",
      "Sales",
      "Expenses",
      "Contacts",
      "Reports",
      "Settings",
    ];
    return { nav_items };
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <div className="h-screen flex pb-[500px]">
          <Navigation />
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
