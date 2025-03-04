"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ManageProfilePage() {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile")
        if (response.ok) {
          const data = await response.json()
          setName(data.name || "")
          setBio(data.bio || "")
          setContactInfo(data.contactInfo || "")
          setWalletAddress(data.walletAddress || "")
        } else {
          setError("Failed to load profile")
        }
      } catch (err) {
        setError("An error occurred while loading the profile")
      }
    }

    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, contactInfo, walletAddress }),
      })

      if (response.ok) {
        setSuccess("Profile updated successfully")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update profile")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Manage Your Profile
        </h1>
        <Card className="w-full max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Your SolMeet Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                  rows={4}
                />
              </div>
              <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-300 mb-1">
                  Contact Information
                </label>
                <Input
                  id="contactInfo"
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                />
              </div>
              <div>
                <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-300 mb-1">
                  Wallet Address for Receiving Payments
                </label>
                <Input
                  id="walletAddress"
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="bg-black/60 border-purple-500/20 focus:border-purple-400"
                  placeholder="Enter your Solana wallet address"
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert variant="default" className="bg-green-900/20 border-green-500/20 text-green-400">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

