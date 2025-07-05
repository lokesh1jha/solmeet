"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Video, AlertCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { formatDistanceToNow, format, parseISO } from "date-fns"

interface Meeting {
  id: string;
  expert: {
    name: string;
    image?: string;
  };
  bookingDate: string;
  bookingDuration: number;
  durationUnit: string;
  status: string;
}

export function UpcomingMeetings() {
  const { data: session } = useSession()
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUpcomingMeetings()
  }, [])

  const fetchUpcomingMeetings = async () => {
    try {
      const response = await axios.get('/api/dashboard/meetings')
      setMeetings(response.data)
    } catch (error) {
      console.error('Error fetching meetings:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatMeetingDate = (dateString: string) => {
    const date = parseISO(dateString)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const meetingDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    
    if (meetingDate.getTime() === today.getTime()) {
      return 'Today'
    } else if (meetingDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow'
    } else {
      return format(date, 'MMM dd, yyyy')
    }
  }
  return (
    <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Meetings</CardTitle>
        <Button variant="outline" className="border-purple-500/30 hover:bg-purple-900/20 hover:border-purple-400/50">
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 rounded-lg border border-purple-500/20 bg-purple-900/10 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-gray-700 mr-4" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-600 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : meetings.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No upcoming meetings</h3>
            <p className="text-gray-400 mb-4">You don't have any meetings scheduled.</p>
            <Button variant="outline" className="border-purple-500/30 hover:bg-purple-900/20">
              <Calendar className="h-4 w-4 mr-2" />
              Book a Session
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {meetings.map((meeting) => {
              const meetingDate = parseISO(meeting.bookingDate)
              const duration = meeting.durationUnit === 'hours' 
                ? `${meeting.bookingDuration} hr${meeting.bookingDuration > 1 ? 's' : ''}` 
                : `${meeting.bookingDuration} min`
              
              return (
                <div
                  key={meeting.id}
                  className="flex items-center p-3 rounded-lg border border-purple-500/20 bg-purple-900/10 hover:bg-purple-900/20 transition-colors"
                >
                  <img
                    src={meeting.expert.image || "/placeholder.svg"}
                    alt={meeting.expert.name}
                    className="w-12 h-12 rounded-full object-cover border border-purple-500/30 mr-4"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{meeting.expert.name}</h3>
                    <p className="text-sm text-gray-400 capitalize">{meeting.status} Session</p>
                    <div className="flex items-center mt-1 text-sm text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="mr-3">{formatMeetingDate(meeting.bookingDate)}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {format(meetingDate, 'h:mm a')} ({duration})
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4 border-blue-500/30 hover:bg-blue-900/20 hover:border-blue-400/50"
                    disabled={meeting.status !== 'confirmed'}
                  >
                    <Video className="h-4 w-4 mr-2 text-blue-400" />
                    {meeting.status === 'confirmed' ? 'Join' : 'Pending'}
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

