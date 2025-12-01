"use client";

import ErrorState from "@/src/components/error-state";
import LoadingState from "@/src/components/loading-state";
import {useTRPC} from "@/src/trpc/client";
import {useSuspenseQuery} from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return( 
    <div>
        {JSON.stringify(data, null, 2)}
    </div>
)};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      descripton="This may take a few seconds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error loading agents"
      descripton="Something went wrong, try again later"
    />
  );
};
