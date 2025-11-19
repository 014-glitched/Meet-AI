import { Card } from '@/src/components/ui/card'
import { auth } from '@/src/lib/auth'
import { SignUpView } from '@/src/modules/auth/ui/views/sign-up-view'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!!session){
    redirect('/')
  }
  return (
    <SignUpView />
  )
}

export default page