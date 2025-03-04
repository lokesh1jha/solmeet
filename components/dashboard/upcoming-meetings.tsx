import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Video } from "lucide-react"

const meetings = [
  {
    id: 1,
    expert: {
      name: "Alex Rivera",
      image: "/placeholder.svg?height=60&width=60",
    },
    date: "Today",
    time: "2:00 PM",
    duration: "60 min",
    topic: "Smart Contract Development",
  },
  {
    id: 2,
    expert: {
      name: "Sophia Chen",
      image: "/placeholder.svg?height=60&width=60",
    },
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "60 min",
    topic: "DeFi Protocol Design",
  },
  {
    id: 3,
    expert: {
      name: "Marcus Johnson",
      image: "/placeholder.svg?height=60&width=60",
    },
    date: "Oct 18, 2023",
    time: "3:30 PM",
    duration: "60 min",
    topic: "NFT Marketplace Strategy",
  },
]

export function UpcomingMeetings() {
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
        <div className="space-y-4">
          {meetings.map((meeting) => (
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
                <p className="text-sm text-gray-400">{meeting.topic}</p>
                <div className="flex items-center mt-1 text-sm text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="mr-3">{meeting.date}</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>
                    {meeting.time} ({meeting.duration})
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="ml-4 border-blue-500/30 hover:bg-blue-900/20 hover:border-blue-400/50"
              >
                <Video className="h-4 w-4 mr-2 text-blue-400" />
                Join
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

