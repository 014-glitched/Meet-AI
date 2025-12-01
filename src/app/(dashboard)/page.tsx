import { auth } from "@/src/lib/auth";
import { HomeView } from "@/src/modules/home/ui/views/home-view";
import { caller } from "@/src/trpc/server";
import { headers } from "next/headers"
import { redirect } from "next/navigation";

const Page = async () => {

  const data = await caller.hello({ text: "Abhy server"
  })

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(!session){
    redirect("/sign-in")
  }

  return <p>{data.greeting}</p>
  return (<HomeView />)
}

export default Page