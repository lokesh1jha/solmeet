"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, CreditCard, Home, LogOut, Menu, MessageSquare, Settings, User, X } from "lucide-react"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { signOut } from "next-auth/react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-purple-500/20 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
            <Link
              href="/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-white"
            >
              <Home className="mr-3 h-5 w-5 text-purple-400" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/meetings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-purple-900/20 hover:text-white"
            >
              <Calendar className="mr-3 h-5 w-5 text-purple-400" />
              Meetings
            </Link>
            <Link
              href="/dashboard/messages"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-purple-900/20 hover:text-white"
            >
              <MessageSquare className="mr-3 h-5 w-5 text-purple-400" />
              Messages
            </Link>
            <Link
              href="/dashboard/payments"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-purple-900/20 hover:text-white"
            >
              <CreditCard className="mr-3 h-5 w-5 text-purple-400" />
              Payments
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-purple-900/20 hover:text-white"
            >
              <User className="mr-3 h-5 w-5 text-purple-400" />
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-purple-900/20 hover:text-white"
            >
              <Settings className="mr-3 h-5 w-5 text-purple-400" />
              Settings
            </Link>
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
            <ConnectWalletButton />
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

