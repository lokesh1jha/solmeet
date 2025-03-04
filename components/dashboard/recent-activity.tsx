import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CreditCard, MessageSquare } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "payment",
    description: "Payment to Alex Rivera",
    amount: "0.5 SOL",
    time: "2 hours ago",
    icon: CreditCard,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-900/20",
    borderColor: "border-blue-500/30",
  },
  {
    id: 2,
    type: "message",
    description: "New message from Sophia",
    time: "5 hours ago",
    icon: MessageSquare,
    iconColor: "text-purple-400",
    bgColor: "bg-purple-900/20",
    borderColor: "border-purple-500/30",
  },
  {
    id: 3,
    type: "booking",
    description: "Booked session with Marcus",
    time: "Yesterday",
    icon: Calendar,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-900/20",
    borderColor: "border-blue-500/30",
  },
  {
    id: 4,
    type: "payment",
    description: "Payment to Sophia Chen",
    amount: "0.65 SOL",
    time: "2 days ago",
    icon: CreditCard,
    iconColor: "text-purple-400",
    bgColor: "bg-purple-900/20",
    borderColor: "border-purple-500/30",
  },
]

export function RecentActivity() {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div
                className={`w-8 h-8 rounded-full ${activity.bgColor} ${activity.borderColor} border flex items-center justify-center mr-3 mt-0.5`}
              >
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div>
                <p className="font-medium">{activity.description}</p>
                {activity.amount && <p className="text-sm font-medium text-gray-300">{activity.amount}</p>}
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

