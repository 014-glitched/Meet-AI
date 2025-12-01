"use client";

import { useTRPC } from "@/src/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {

  const trpc = useTRPC()
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Abhyudai" }))

  return (
    <div className="flex flex-col p-4 gap-y-4">
      {data?.greeting}
    </div>
  )
}