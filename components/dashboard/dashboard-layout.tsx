"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, CreditCard, Home, LogOut, Menu, MessageSquare, Settings, User, X } from "lucide-react"
import { signOut } from "next-auth/react"
import { SolanaWalletButton } from "../solana-wallet-button"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    handleRouteChange(); // Set initial path
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/meetings", label: "Meetings", icon: Calendar },
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  return (

    <div className="min-h-screen bg-black text-white flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-purple-500/20 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 border-b border-purple-500/20 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mr-2">
              <span className="font-bold text-white text-sm">SM</span>
            </div>
            <span className="font-bold text-lg">SolMeet</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive
                      ? "bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-white"
                      : "text-gray-300 hover:bg-purple-900/20 hover:text-white"
                    }`}
                >
                  <item.icon className="mr-3 h-5 w-5 text-purple-400" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-purple-500/20">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-purple-900/20 hover:text-white"
            onClick={() => signOut()}
          >
            <LogOut className="mr-3 h-5 w-5 text-purple-400" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-black/60 backdrop-blur-xl border-b border-purple-500/20 h-16 flex items-center justify-between px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="ml-auto flex items-center space-x-4">
            <SolanaWalletButton />
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="font-medium text-white">JD</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gradient-to-br from-black via-purple-950/5 to-black">{children}</main>
      </div>
    </div>
  )
}
