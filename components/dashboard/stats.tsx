"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, CreditCard, Users } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

interface StatsData {
  totalSessions: number;
  hoursSpent: number;
  expertsMetCount: number;
  totalSpent: number;
}

export function Stats() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<StatsData>({
    totalSessions: 0,
    hoursSpent: 0,
    expertsMetCount: 0,
    totalSpent: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/dashboard/stats')
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
      // Use default values on error
    } finally {
      setLoading(false)
    }
  }
  
  const statItems = [
    {
      title: "Total Sessions",
      value: loading ? "..." : stats.totalSessions.toString(),
      icon: Calendar,
      color: "from-purple-600 to-blue-600",
      textColor: "text-purple-400",
    },
    {
      title: "Hours Spent",
      value: loading ? "..." : stats.hoursSpent.toFixed(1),
      icon: Clock,
      color: "from-blue-600 to-cyan-600",
      textColor: "text-blue-400",
    },
    {
      title: "Experts Met",
      value: loading ? "..." : stats.expertsMetCount.toString(),
      icon: Users,
      color: "from-purple-600 to-pink-600",
      textColor: "text-purple-400",
    },
    {
      title: "SOL Spent",
      value: loading ? "..." : stats.totalSpent.toFixed(2),
      icon: CreditCard,
      color: "from-blue-600 to-purple-600",
      textColor: "text-blue-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <Card key={index} className="bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mr-4 shadow-lg`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

