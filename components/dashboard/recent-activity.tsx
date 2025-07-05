"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CreditCard, MessageSquare, Clock, AlertCircle } from "lucide-react"
import { formatDistanceToNow, parseISO } from "date-fns"
import axios from "axios"

interface Activity {
  id: string;
  type: 'booking' | 'message' | 'payment';
  description: string;
  amount?: string;
  createdAt: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentActivity()
  }, [])

  const fetchRecentActivity = async () => {
    try {
      const response = await axios.get('/api/dashboard/activity')
      setActivities(response.data)
    } catch (error) {
      console.error('Error fetching activity:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return Calendar
      case 'message':
        return MessageSquare
      case 'payment':
        return CreditCard
      default:
        return Clock
    }
  }

  const getActivityColors = (type: string) => {
    switch (type) {
      case 'booking':
        return {
          iconColor: 'text-blue-400',
          bgColor: 'bg-blue-900/20',
          borderColor: 'border-blue-500/30'
        }
      case 'message':
        return {
          iconColor: 'text-purple-400',
          bgColor: 'bg-purple-900/20',
          borderColor: 'border-purple-500/30'
        }
      case 'payment':
        return {
          iconColor: 'text-green-400',
          bgColor: 'bg-green-900/20',
          borderColor: 'border-green-500/30'
        }
      default:
        return {
          iconColor: 'text-gray-400',
          bgColor: 'bg-gray-900/20',
          borderColor: 'border-gray-500/30'
        }
    }
  }

  return (
    <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start animate-pulse">
                <div className="w-8 h-8 rounded-full bg-gray-700 mr-3 mt-0.5" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded mb-1" />
                  <div className="h-3 bg-gray-600 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No recent activity</h3>
            <p className="text-gray-400">Your activity will appear here once you start using the platform.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              const colors = getActivityColors(activity.type)
              const timeAgo = formatDistanceToNow(parseISO(activity.createdAt), { addSuffix: true })
              
              return (
                <div key={activity.id} className="flex items-start">
                  <div
                    className={`w-8 h-8 rounded-full ${colors.bgColor} ${colors.borderColor} border flex items-center justify-center mr-3 mt-0.5`}
                  >
                    <Icon className={`h-4 w-4 ${colors.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.description}</p>
                    {activity.amount && (
                      <p className="text-sm font-medium text-gray-300">{activity.amount}</p>
                    )}
                    <p className="text-xs text-gray-400">{timeAgo}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

