"use client";

import { Button } from "@/src/components/ui/button";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";


export const HomeView = () => {

  const { data: session } = authClient.useSession()
  const router = useRouter()

  if(!session) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <div className="flex flex-col gap-y-4 p-4">
        <p>{session.user.name} logged in successfully.</p>
        <Button className="cursor-pointer" onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push('/sign-in')
            }
        })}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}