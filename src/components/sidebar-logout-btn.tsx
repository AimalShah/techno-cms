import { logout } from '@/actions/auth'
import { IconLogout } from '@tabler/icons-react'
import React from 'react'

export default function SidebarLogoutBtn() {
  return (
    <form action={logout}>
    <button  className='flex items-center gap-4 cursor-pointer'>
        <IconLogout />
        Logout
    </button>
    </form>
  )
}
