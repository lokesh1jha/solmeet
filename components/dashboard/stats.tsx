import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, CreditCard, Users } from "lucide-react"

const stats = [
  {
    title: "Total Sessions",
    value: "12",
    icon: Calendar,
    color: "from-purple-600 to-blue-600",
    textColor: "text-purple-400",
  },
  {
    title: "Hours Spent",
    value: "18.5",
    icon: Clock,
    color: "from-blue-600 to-cyan-600",
    textColor: "text-blue-400",
  },
  {
    title: "Experts Met",
    value: "5",
    icon: Users,
    color: "from-purple-600 to-pink-600",
    textColor: "text-purple-400",
  },
  {
    title: "SOL Spent",
    value: "6.2",
    icon: CreditCard,
    color: "from-blue-600 to-purple-600",
    textColor: "text-blue-400",
  },
]

export function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mr-4`}
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

