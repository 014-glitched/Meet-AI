"use client";

import ErrorState from "@/src/components/error-state";
import LoadingState from "@/src/components/loading-state";
import {useTRPC} from "@/src/trpc/client";
import {useSuspenseQuery} from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./column";
import EmptyState from "@/src/components/empty-state";


export const AgentsView = () => {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return( 
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        {/* {JSON.stringify(data, null, 2)} */}
        <DataTable data={data} columns={columns}/>
        {data.length === 0 && (
          <EmptyState 
            title="Create your first agent"
            descripton="Create an agent to join meetings. Each agent will follow your instruction and can interact with participants during the call."
          />
        )}
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
