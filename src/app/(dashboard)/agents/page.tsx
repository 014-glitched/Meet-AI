import { auth } from "@/src/lib/auth"
import AgentsListHeader from "@/src/modules/agents/ui/agents-list-header"
import { AgentsView, AgentsViewError, AgentsViewLoading } from "@/src/modules/agents/ui/agents-view"
import { getQueryClient, trpc } from "@/src/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from 'react-error-boundary'

const Page = async () => {

  const session = await auth.api.getSession({
      headers: await headers()
    });
  
  if(!session){
    redirect("/sign-in")
  }

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default Page