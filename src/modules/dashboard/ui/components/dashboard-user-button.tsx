import { GeneratedAvatar } from '@/src/components/generated-avatar'
import { Avatar, AvatarImage } from '@/src/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu'
import { authClient } from '@/src/lib/auth-client'
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const DashboardUserButton = () => {

    const router = useRouter()
    const { data, isPending } = authClient.useSession()

    const onLogout = async () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/sign-in')
                }
            }
        })
    }
    
    if(isPending || !data?.user){
        return null
    }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden cursor-pointer'>
            {data?.user?.image ? (
                <Avatar>
                    <AvatarImage src={data.user.image} />
                </Avatar>
            ): 
            (
                <GeneratedAvatar seed={data.user.name} variant='initials' clasName='size-9 mr-3'/>
            )}
            <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0 cursor-pointer'>
                <p className='text-sm w-full truncate'>{data.user.name}</p>
                <p className='text-xs truncate w-full'>{data.user.email}</p>
            </div>
            <ChevronDownIcon className='size-4 shrink-0'/>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' side="right" className='w-72 ml-2'>
            <DropdownMenuLabel>
                <div className='flex flex-col gap-1'>
                    <span className='font-medium truncate'>{data.user.name}</span>
                    <span className='text-sm font-normal text-muted-foreground truncate'>{data.user.email}</span>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer flex items-center justify-between'>
                Billing
                <CreditCardIcon className='size-4'/>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer flex items-center justify-between' onClick={onLogout}>
                LogOut
                <LogOutIcon className='size-4'/>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DashboardUserButton