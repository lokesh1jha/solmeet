"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Star } from "lucide-react"
import { useSession } from "next-auth/react"
import { Expert } from "@/app/(public)/experts/page"
import { useAppContext } from "@/context/AppContext"
import { useRouter } from "next/navigation";


interface ExpertsListProps {
  searchQuery: string
  filters: {
    tags?: string[]
    minRating?: number
    maxPrice?: number
  }
  experts: Expert[]
}


export const ExpertsList: React.FC<ExpertsListProps> = ({ searchQuery, filters, experts }) => {
  const { data: session } = useSession()
  const loggedeIn = !!session
  const [selectedExpert, setSelectedExpert] = useState<(typeof experts)[0] | null>(null)
  const { setExpertForBooking } = useAppContext()
  const router = useRouter()


  const handleBookingClick = (expert: (typeof experts)[0]) => {
    console.log("handleBookingClick")
    if (loggedeIn) {
      if (expert) {
        console.log("logged in")
        setExpertForBooking(expert)
        setSelectedExpert(expert)
        localStorage.setItem("expertForBooking", JSON.stringify(expert))
        router.push(`/booking/${expert.id}`)
      }
    } else {
      // If not logged in, set the selected expert and redirect to login page
      setSelectedExpert(expert)
      router.push("/auth/login") 
    }
  }


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experts.map((expert) => (
          <Card
            key={expert.id}
            className="bg-black/40 backdrop-blur-sm border border-purple-500/20 overflow-hidden hover:border-purple-400/40 transition-all duration-300 group"
          >
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <img
                  src={expert.user.image || "/placeholder.svg"}
                  alt={expert.user.name}
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20 flex items-center">
                  <div className="flex items-center bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{expert.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({expert.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{expert.user.name}</h3>
                {/* <p className="text-purple-400 mb-3">{expert.user.role}</p> */}

                <div className="flex flex-wrap gap-2 mb-4 mt-5">
                  {expert.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-purple-950/20 border-purple-500/30 text-purple-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-gray-400 mb-4 line-clamp-3">{expert.user.bio}</p>

                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                  {expert.availableWeekDays.join(", ")}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {new Date(expert.startTimeSlot).toLocaleTimeString()} - {new Date(expert.endTimeSlot).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{expert.hourlyRate} SOL</span>
                    <span className="text-gray-400 text-sm ml-1">/ hour</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none"
                  onClick={() => handleBookingClick(expert)}
                >
                  {loggedeIn ? "Book Session" : "Login to Book"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default ExpertsList
