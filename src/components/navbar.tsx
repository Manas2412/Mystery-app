"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from '@/components/ui/button';

const Navbar = () => {

    const { data: session } = useSession()

    const user: User = session?.user as User

    return (
        <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white border-b border-gray-800">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
                    Mystery Message
                </Link>
                {session ? (
                    <div className="flex items-center space-x-4">
                        <span className="hidden md:inline">Welcome, {user?.username || user?.email}</span>
                        <Button className="w-full md:w-auto bg-slate-100 text-black hover:bg-slate-200" onClick={() => signOut()}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Link href="/sign-in">
                        <Button className="w-full md:w-auto bg-slate-100 text-black hover:bg-slate-200">
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar
