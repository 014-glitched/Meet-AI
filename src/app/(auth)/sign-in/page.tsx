import { auth } from '@/src/lib/auth'
import { SignInView } from '@/src/modules/auth/ui/views/sign-in-view'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const page = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(!!session){
    redirect("/")
  }

  return (
    <SignInView />
  )
}

export default page